package com.github.aesteve.nubes.examples.chat.controllers.socket;

import com.github.aesteve.nubes.examples.chat.io.MessageRegistry;
import com.github.aesteve.nubes.examples.chat.model.ChatRoom;
import com.github.aesteve.nubes.orm.mongo.MongoNubes;
import com.github.aesteve.nubes.orm.mongo.services.MongoService;
import com.github.aesteve.nubes.orm.queries.FindBy;
import com.github.aesteve.vertx.nubes.annotations.services.Service;
import com.github.aesteve.vertx.nubes.annotations.sockjs.OnMessage;
import com.github.aesteve.vertx.nubes.annotations.sockjs.SockJS;

import io.vertx.core.buffer.Buffer;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.handler.sockjs.SockJSSocket;

@SockJS("/socket/rooms")
public class ChatRoomsSocketController {
	
	public static final String ENTER_ROOM = "ENTER";
	public static final String LEAVE_ROOM = "LEAVE";
	
	private MessageRegistry registry;
	
	@Service(MongoNubes.MONGO_SERVICE_NAME)
	private MongoService mongo;
	
	public ChatRoomsSocketController() {
		registry = new MessageRegistry();
	}
	
	@OnMessage
	public void msgReceived(SockJSSocket socket, Buffer buff) {
		String msg = buff.toString("UTF-8");
		JsonObject json;
		try {
			json = new JsonObject(msg);
		} catch (Exception e) {
			socket.write(registry.INVALID_MSG_SENT);
			return;
		}
		String action = json.getString("action");
		switch(action) {
			case ENTER_ROOM:
				enterRoom(socket, json.getString("room"));
		}
	}
	
	private void enterRoom(SockJSSocket sock, String roomName) {
		FindBy<ChatRoom> findRoom = new FindBy<>(ChatRoom.class, "name", roomName);
		mongo.findBy(findRoom, res -> {
			if (res.failed()) {
				sock.write(registry.UNEXPECTED_ERROR);
				return;
			}
			ChatRoom chat = res.result();
			if (chat == null) {
				sock.write(registry.NOT_FOUND);
				return;
			}
			
		});
	}
}
