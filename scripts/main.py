from laserqueue import Queue
from config import *
cprintconf.color = bcolors.BLUE
cprintconf.name = "Backend"
config = Config(os.path.join("..","www","config.json"))
import jsonhandler as comm
import sidhandler as sids

import json
import os
import time
import asyncio
import websockets

from parseargv import args

selfpath = os.path.dirname(os.path.realpath(__file__))
os.chdir(selfpath)

@asyncio.coroutine
def server(websocket, path):
	while True:
		message = yield from websocket.recv()
		if not message: break
		try:
			messagedata = json.loads(message)
			if "action" in messagedata:
				if messagedata["action"] not in ["null", "auth", "uuddlrlrba"]:
					cprint(message)
					cprint("Saving message.")
				
				data = process(messagedata)
				if websocket.open and data:
					yield from websocket.send(json.dumps(data))
							
		except Exception as e: 
			cprint(bcolors.YELLOW + str(e))
			

def serve():
	cprint("Serving WebSockets on 0.0.0.0 port "+config["port"]+" ...")
	start_server = websockets.serve(hello, "0.0.0.0", config['port'])
	loop = asyncio.get_event_loop()
	try:
		loop.run_until_complete(start_server)
		loop.run_forever()
	except KeyboardInterrupt:
		quit(0)

def process(data):
	global queue, shamed, sessions
	if data:
		try:
			queue.metapriority()
			x = comm.parseData(queue, sessions, data)
			if "action" in data and data["action"] != "null":
				sessions.update()
				if args.backup:
					json.dump(queue.queue, open("cache.json", "w"), indent=2)
					sids.cache(sessions)
			if x and type(x) is str:
				if x == "uuddlrlrba":
					if config["easter_eggs"]:
						serveToAllConnections({"action":"rickroll"})
					else:
						cprint(bcolors.YELLOW + "This is a serious establishment, son. I'm dissapointed in you.")
				elif x == "refresh":
					if config["allow_force_refresh"]:
						serveToAllConnections({"action":"refresh"})
					else:
						cprint(bcolors.YELLOW + "Force refresh isn't enabled. (config.json, allow_force_refresh)")
				elif x == "sorry":
					if data["sid"][:int(len(data["sid"])/2)] in shamed:
						shamed.remove(data["sid"][:int(len(data["sid"])/2)])
				else:
					cprint(bcolors.YELLOW + x)
				time.sleep(0.2)
			else:
				if x is False:
					shamed.append(data["sid"][:int(len(data["sid"])/2)])
				return comm.generateData(queue, sessions, shamed)
		except Exception as e: 
			cprint(bcolors.YELLOW + str(e))

def main():
	global queue, shamed, sessions
	shamed = []
	if args.backup:
		if os.path.exists("cache.json"):
			queue = Queue.load(open("cache.json"))
		else:
			json.dump({}, open("cache.json", "w"))
		sessions = sids.loadcache()
	else:
		queue = Queue()
		sessions = sids.SIDCache()
	cprint("Serving WebSockets on 0.0.0.0 port "+config["port"]+" ...")
	start_server = websockets.serve(server, "0.0.0.0", config['port'])
	loop = asyncio.get_event_loop()
	try:
		loop.run_until_complete(start_server)
		loop.run_forever()
	except KeyboardInterrupt:
		quit(0)




if __name__ == "__main__":
	main()