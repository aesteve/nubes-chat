package com.github.aesteve.nubes.examples.chat.controllers.api;

import com.github.aesteve.nubes.examples.chat.model.ChatRoom;
import com.github.aesteve.nubes.orm.annotations.Create;
import com.github.aesteve.nubes.orm.annotations.RetrieveById;
import com.github.aesteve.nubes.orm.annotations.RetrieveByQuery;
import com.github.aesteve.nubes.orm.mongo.MongoNubes;
import com.github.aesteve.nubes.orm.mongo.services.MongoService;
import com.github.aesteve.nubes.orm.queries.FindBy;
import com.github.aesteve.vertx.nubes.annotations.Controller;
import com.github.aesteve.vertx.nubes.annotations.mixins.ContentType;
import com.github.aesteve.vertx.nubes.annotations.params.Param;
import com.github.aesteve.vertx.nubes.annotations.params.RequestBody;
import com.github.aesteve.vertx.nubes.annotations.routing.http.GET;
import com.github.aesteve.vertx.nubes.annotations.routing.http.POST;
import com.github.aesteve.vertx.nubes.annotations.services.Service;
import com.github.aesteve.vertx.nubes.context.PaginationContext;

@Controller("/api/rooms/")
@ContentType("application/json")
public class ChatRooms {
	
	@Service(MongoNubes.MONGO_SERVICE_NAME)
	private MongoService mongo;
	
	@GET
	@RetrieveByQuery
	public FindBy<ChatRoom> list(PaginationContext context) {
		return new FindBy<>(ChatRoom.class);
	}
	
	@GET(":name")
	@RetrieveById
	public FindBy<ChatRoom> get(@Param String name) {
		return new FindBy<>(ChatRoom.class, "name", name);
	}
	
	@POST
	@Create
	public ChatRoom create(@RequestBody ChatRoom room) {
		return room;
	}
}
