package com.github.aesteve.nubes.examples.chat;

import io.vertx.core.Context;
import io.vertx.core.Vertx;

import com.github.aesteve.nubes.examples.chat.services.RoomService;
import com.github.aesteve.nubes.orm.mongo.MongoNubesServer;

public class ChatServer extends MongoNubesServer {
	@Override
	public void init(Vertx vertx, Context context) {
		super.init(vertx, context);
		nubes.registerService(RoomService.NAME, new RoomService());
	}
}
