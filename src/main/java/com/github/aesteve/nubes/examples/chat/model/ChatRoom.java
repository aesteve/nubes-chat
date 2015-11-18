package com.github.aesteve.nubes.examples.chat.model;

import java.util.ArrayList;
import java.util.List;

public class ChatRoom {

	private String name;
	private String description;
	private List<String> registeredOperators;

	public ChatRoom() {
		registeredOperators = new ArrayList<>();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<String> getRegisteredOperators() {
		return registeredOperators;
	}

	public void setRegisteredOperators(List<String> registeredOperators) {
		this.registeredOperators = registeredOperators;
	}

	public void newOperator(String opName) {
		registeredOperators.add(opName);
	}

	public void removeOperator(String opName) {
		registeredOperators.remove(opName);
	}
}
