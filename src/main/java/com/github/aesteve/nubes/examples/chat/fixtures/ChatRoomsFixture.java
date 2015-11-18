package com.github.aesteve.nubes.examples.chat.fixtures;

import io.vertx.core.Future;
import io.vertx.core.Vertx;

import com.github.aesteve.nubes.examples.chat.model.ChatRoom;
import com.github.aesteve.nubes.orm.mongo.MongoNubes;
import com.github.aesteve.nubes.orm.mongo.services.MongoService;
import com.github.aesteve.nubes.orm.queries.FindBy;
import com.github.aesteve.vertx.nubes.annotations.services.Service;
import com.github.aesteve.vertx.nubes.fixtures.Fixture;
import com.github.aesteve.vertx.nubes.utils.async.AsyncUtils;

public class ChatRoomsFixture extends Fixture {

	@Service(MongoNubes.MONGO_SERVICE_NAME)
	MongoService mongo;

	@Override
	public int executionOrder() {
		return 0;
	}

	@Override
	public void startUp(Vertx vertx, Future<Void> future) {
		ChatRoom testRoom = new ChatRoom();
		testRoom.setName("test");
		testRoom.setDescription("Just a room to test if everything's working");
		mongo.create(testRoom, AsyncUtils.ignoreResult(future));
	}

	@Override
	public void tearDown(Vertx vertx, Future<Void> future) {
		mongo.deleteAll(new FindBy<>(ChatRoom.class), AsyncUtils.ignoreResult(future));
	}

}
