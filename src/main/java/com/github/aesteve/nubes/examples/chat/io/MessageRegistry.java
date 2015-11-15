package com.github.aesteve.nubes.examples.chat.io;

import io.vertx.core.buffer.Buffer;
import io.vertx.core.json.JsonObject;

public class MessageRegistry {
	
	public Buffer INVALID_MSG_SENT;
	public Buffer UNEXPECTED_ERROR;
	public Buffer NOT_FOUND;
	
	public MessageRegistry() {
		INVALID_MSG_SENT = Buffer.buffer(error(400, "You have to send JSON"));
		UNEXPECTED_ERROR = Buffer.buffer(error(500, "An unexpected error occured"));
		NOT_FOUND = Buffer.buffer(error(404, "Not found"));
	}
	
	public static String error(int status, String err) {
		JsonObject json = new JsonObject();
		JsonObject error = new JsonObject();
		error.put("status", status);
		error.put("message", err);
		json.put("error", error);
		return json.toString();
	}
}
