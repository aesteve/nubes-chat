package com.github.aesteve.nubes.examples.chat.controllers.socket;

import io.vertx.core.Vertx;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.handler.sockjs.BridgeEvent;
import io.vertx.ext.web.handler.sockjs.SockJSSocket;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.github.aesteve.nubes.examples.chat.io.MessageRegistry;
import com.github.aesteve.nubes.examples.chat.services.RoomService;
import com.github.aesteve.nubes.orm.mongo.MongoNubes;
import com.github.aesteve.nubes.orm.mongo.services.MongoService;
import com.github.aesteve.vertx.nubes.annotations.services.Service;
import com.github.aesteve.vertx.nubes.annotations.sockjs.bridge.EventBusBridge;
import com.github.aesteve.vertx.nubes.annotations.sockjs.bridge.OutboundPermitted;
import com.github.aesteve.vertx.nubes.annotations.sockjs.bridge.events.REGISTER;
import com.github.aesteve.vertx.nubes.annotations.sockjs.bridge.events.SOCKET_CLOSED;

@EventBusBridge("/socket/rooms")
@OutboundPermitted(addressRegex = "rooms.*")
public class ChatRoomsSocketController {

	public static final String ENTER_ROOM = "ENTER";
	public static final String LEAVE_ROOM = "LEAVE";
	private static final Pattern roomPattern = Pattern.compile("rooms[.](?<name>.*)");

	private Map<SockJSSocket, String> userPerSocket;

	@Service(MongoNubes.MONGO_SERVICE_NAME)
	private MongoService mongo;

	@Service(RoomService.NAME)
	private RoomService roomService;

	public ChatRoomsSocketController() {
		userPerSocket = new HashMap<>();
	}

	@REGISTER
	public void userRegistered(BridgeEvent event, EventBus eb, Vertx vertx) {
		JsonObject json = event.rawMessage();
		String address = json.getString("address");
		JsonObject headers = json.getJsonObject("headers");
		Matcher m = roomPattern.matcher(address);
		if (m.find()) {
			event.complete(true);
			String room = m.group("name");
			String user = headers.getString("username");
			userPerSocket.put(event.socket(), user);
			roomService.newSubscriber(room, user);
			// delay (let some time to complete() )
			vertx.setTimer(500, timerId -> {
				eb.publish(address, MessageRegistry.users(roomService.getUsers(room)));
			});
		} else {
			event.fail("Invalid address");
		}
	}

	@SOCKET_CLOSED
	public void onClose(BridgeEvent event) {
		SockJSSocket sock = event.socket();
		String username = userPerSocket.remove(sock);
		if (username != null) {
			roomService.subscriberLeft(username);
		}
		event.complete(true);
	}
}
