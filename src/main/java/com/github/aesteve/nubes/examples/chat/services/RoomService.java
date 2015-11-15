package com.github.aesteve.nubes.examples.chat.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RoomService { // worth the pun...

	public static final String NAME = "ROOM_SERVICE";
	
	private Map<String, List<String>> activeRooms;
	
	public RoomService() {
		activeRooms = new HashMap<>();
	}
	
	public void newSubscriber(String roomName, String username) {
		List<String> users = activeRooms.get(roomName);
		if (users == null) {
			users = new ArrayList<>();
			activeRooms.put(roomName, users);
		}
		users.add(username);
	}
	
	public void subscriberLeft(String roomName, String username) {
		List<String> users = activeRooms.get(roomName);
		if (users == null) {
			activeRooms.remove(roomName);
			return;
		}
		users.remove(username);
		if (users.isEmpty()) {
			activeRooms.remove(roomName);
		}
	}
	
	public void subscriberLeft(String username) {
		activeRooms.forEach((room, users) -> {
			users.remove(username);
		});
	}
	
	public List<String> getUsers(String room) {
		return activeRooms.get(room);
	}
	
}
