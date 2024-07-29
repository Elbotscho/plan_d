import json
from django.core.management.base import BaseCommand
from business_expansion.models import Person, Fleet, Ship
import requests
import random

fleets = []
ships = []
persons = []

star_wars_fleets = [
    "Rebel Alliance Fleet",
    "Galactic Empire Fleet",
    "New Republic Fleet",
    "First Order Fleet",
    "Resistance Fleet",
    "Trade Federation Fleet",
    "Separatist Alliance Fleet",
    "Republic Fleet",
    "Sith Eternal Fleet",
    "Mandalorian Fleet",
    "Hutt Cartel Fleet"
]

def get_ship_names():
    url = 'https://swapi.dev/api/starships/'

    names = []

    count = 0
    for i in range(1,5):
        response = requests.get(url+f'?page={i}')
        if response.status_code == 200:
            data=response.json()
            for starship in data['results']:
                names.append(starship['name'])
                count += 1

    for i in range (90 - count):
        names.append(f'Star Destroyer {i}')

    return names

class Command(BaseCommand):
    help = 'Import data from People.json'

    def handle(self, *args, **kwargs):
        for item in star_wars_fleets:
            fleets.append(Fleet.objects.create(
                name=item,
            ))
        self.stdout.write(self.style.SUCCESS('Data successfully imported'))
        ship_names = get_ship_names()
        count = 0
        for item in ship_names:
            ships.append(Ship.objects.create(
                name=item,
                fleet=fleets[count%len(fleets)],
            ))
            count += 1
        self.stdout.write(self.style.SUCCESS('Data successfully imported'))
        with open('business_expansion/management/commands/people.json', 'r') as file:
            data = json.load(file)
            count = 0
            for item in data:
                person = Person.objects.create(
                    name=item['name'],
                    rank=item['rank'],
                    stationed_currently=ships[count%len(ships)] if item['rank'] != 'Admiral' else None
                )
                if item['rank'] != 'Admiral':
                    number_of_past_ships = random.randint(0, 3)  
                    for i in range(number_of_past_ships):
                        person.stationed_past.add(random.randint(1, 90))
                        person.save()
                count += 1
                if person.rank == "Admiral":
                    persons.append(person)
        self.stdout.write(self.style.SUCCESS('Data successfully imported'))
        count = 0

        for fleet in fleets:
            fleet.admiral = persons[count%len(persons)]
            fleet.save()
            count += 1

        
