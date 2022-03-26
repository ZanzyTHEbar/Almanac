#!/usr/bin/python3
# -*- coding: utf-8 -*-

import requests
from xml.dom.minidom import parseString
from colorama import Fore, Style

Yellow = Fore.YELLOW
Reset_colour = Style.RESET_ALL
# take user input and ask for the url
print(f"{Yellow}Please enter the URL of the DLNA server you want to search for (eg: http://192.168.1.1:8200) {Reset_colour} \n")
minidlna = input()
headers = {'Content-Type': 'text/xml; charset=utf-8', 'SOAPACTION': 'urn:schemas-upnp-org:service:ContentDirectory:1#Browse'
           }


def get_object_id(index):
    return '''
      <?xml version="1.0" encoding="utf-8"?>
        <s:Envelope xmlns:ns0="urn:schemas-upnp-org:service:ContentDirectory:1" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
          <s:Body>
            <ns0:Browse>
              <ObjectID>%s</ObjectID>
              <BrowseFlag>BrowseDirectChildren</BrowseFlag>
              <Filter>*</Filter>
            </ns0:Browse>
          </s:Body>
        </s:Envelope>
      </xml>
    ''' % index


def parse_service(service):
    name = service.getElementsByTagName('serviceType')[0].firstChild.nodeValue
    url = service.getElementsByTagName('controlURL')[0].firstChild.nodeValue
    print (f"{Fore.BLUE}Service: {name} {Reset_colour}")
    print (f"{Fore.BLUE}URL: {url} {Reset_colour}")
    # write the above to a file
    with open('dlna.txt', 'a') as f:
        f.write(f"Service: {name}\n")
        f.write(f"URL: {url}\n")
    return {'name': name, 'url': url
            }


def parse_container(container):
    index = container.getAttribute('id')
    title = container.getElementsByTagName('dc:title')[0].firstChild.nodeValue
    return {'index': index, 'title': title
            }


def parse_item(item):
    index = item.getAttribute('id')
    title = item.getElementsByTagName('dc:title')[0].firstChild.nodeValue
    result = item.getElementsByTagName('res')[0]
    # write the above to a file
    with open('dlna.txt', 'a') as f:
        f.write(f"Item: {title}\n")
        f.write(f"Result: {result.firstChild.nodeValue}\n")
    return {'index': index, 'title': title, 'size': result.getAttribute('size'), 'duration': result.getAttribute('duration'), 'bitrate': result.getAttribute('bitrate'), 'sampling': result.getAttribute('sampleFrequency'), 'channels': result.getAttribute('nrAudioChannels'), 'resolution': result.getAttribute('resolution'), 'url': result.firstChild.nodeValue
            }


result = requests.get('%s%s' % (minidlna, '/rootDesc.xml'))
root = parseString(result.content)

services = list(map(lambda service: parse_service(
    service), root.getElementsByTagName('service')))
content = [service for service in services if service['name']
           == 'urn:schemas-upnp-org:service:ContentDirectory:1'][0]
request = '%s%s' % (minidlna, content['url'])

result = requests.post(request, data=get_object_id('0'), headers=headers)
root = parseString(result.content)
body = parseString(root.getElementsByTagName('Result')[0].firstChild.nodeValue)

containers = list(map(lambda container: parse_container(
    container), body.getElementsByTagName('container')))
for container in containers:
    print(container['index'], container['title'])

    result = requests.post(request, data=get_object_id(
        container['index']), headers=headers)
    root = parseString(result.content)
    body = parseString(root.getElementsByTagName(
        'Result')[0].firstChild.nodeValue)
    pretty = body.toprettyxml()
    print(pretty)
    # write pretty to file
    with open('%s.xml' % container['index'], 'w') as f:
        f.write(pretty)

    folders = list(map(lambda container: parse_container(
        container), body.getElementsByTagName('container')))
    for folder in folders:
        print(folder['index'], folder['title'])

        result = requests.post(request, data=get_object_id(
            folder['index']), headers=headers)
        root = parseString(result.content)

        body = parseString(root.getElementsByTagName(
            'Result')[0].firstChild.nodeValue)
        pretty = body.toprettyxml()
        with open('%s.xml' % container['index'], 'w') as f:
            f.write(pretty)
        print(pretty)
        # write pretty to file

        items = list(map(lambda item: parse_item(item),
                         body.getElementsByTagName('item')))
        for item in items:
            print('Index', item['index'])
            print('Title', item['title'])
            print('Size', item['size'])
            print('Duration', item['duration'])
            print('Bitrate', item['bitrate'])
            print('Sampling', item['sampling'])
            print('Channels', item['channels'])
            print('Resolution', item['resolution'])
            print('Url', item['url'])
            print('----')

        print('----')
