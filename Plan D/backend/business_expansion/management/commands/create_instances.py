import json
import random
from faker import Faker

fake = Faker()

ranks = ['Commander', 'Lieutenant', 'Recruit']
rank_numbers = [26, 3000, 6881]

people = []

people.extend({'name': fake.name(), 'rank': 'Captain'} for _ in range(90))

people.extend({'name': fake.name(), 'rank': 'Admiral'} for _ in range(3))

num_iterations = sum(rank_numbers)

for _ in range(num_iterations):
    while True:
        random_index = random.randint(0, 2)  
        if rank_numbers[random_index] > 0:
            people.append({
                'name': fake.name(),
                'rank': ranks[random_index],
            })
            rank_numbers[random_index] -= 1
            break

with open('people.json', 'w') as json_file:
    json.dump(people, json_file, indent=4)

