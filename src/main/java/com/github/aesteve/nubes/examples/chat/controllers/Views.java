package com.github.aesteve.nubes.examples.chat.controllers;

import com.github.aesteve.vertx.nubes.annotations.Controller;
import com.github.aesteve.vertx.nubes.annotations.File;
import com.github.aesteve.vertx.nubes.annotations.routing.http.GET;

@Controller("/")
public class Views {
	
	@GET
	@File("web/index.html")
	public void index() {}
	
}
