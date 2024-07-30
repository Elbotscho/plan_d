# serializers.py
from rest_framework import serializers
from .models import Fleet, Ship, Person

### Foreign-Key Informations

class FleetSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fleet
        fields = ['id', 'name']

class ShipSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ship
        fields = ['id', 'name']

class PersonSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'name', 'rank']


#####################################################################################
### Serializer for all entries in the table

class FleetSerializer(serializers.ModelSerializer):
    admiral = PersonSimpleSerializer(read_only=True)
    size = serializers.SerializerMethodField()

    class Meta:
        model = Fleet
        fields = ['id', 'name', 'admiral', 'size']

    def get_size(self, obj):
        return obj.size()
    
class ShipSerializer(serializers.ModelSerializer):
    size = serializers.SerializerMethodField()
    fleet =FleetSimpleSerializer(read_only=True)

    class Meta:
        model = Ship
        fields = ['id', 'name', 'fleet', 'size']

    def get_size(self, obj):
        return obj.size()
    
class PersonSerializer(serializers.ModelSerializer):
    stationed_currently = ShipSimpleSerializer(read_only=True)

    class Meta:
        model = Person
        fields = ['id', 'name', 'rank', 'stationed_currently']


#####################################################################################
### Serializer for viewing an entry in the table

class FleetDetailSerializer(serializers.ModelSerializer):
    admiral = PersonSimpleSerializer(read_only=True)
    ship = ShipSimpleSerializer(many=True, read_only=True)
    size = serializers.SerializerMethodField()
    ranks = serializers.SerializerMethodField()

    class Meta:
        model = Fleet
        fields = ['name', 'admiral', 'ship', 'size', 'ranks']

    def get_size(self, obj):
        return obj.size()

    def get_ranks(self, obj):
        return obj.ranks()

class ShipDetailSerializer(serializers.ModelSerializer):
    crew = PersonSimpleSerializer(many=True, read_only=True)
    ranks = serializers.SerializerMethodField()
    fleet = FleetSimpleSerializer(read_only=True)

    class Meta:
        model = Ship
        fields = ['name', 'fleet', 'ranks', 'crew']

    def get_ranks(self, obj):
        return obj.ranks()
    
class PersonDetailSerializer(serializers.ModelSerializer):
    stationed_currently = ShipSimpleSerializer(read_only=True)
    stationed_past = serializers.SerializerMethodField()

    class Meta:
        model = Person
        fields = ['name', 'rank', 'stationed_currently', 'stationed_past']

    def get_stationed_past(self, obj):
        ships = []
        for ship in obj.stationed_past.values():
            ships.append(ship)
        return ships
        

#####################################################################################
### Save Serializers

class SaveFleetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fleet
        fields = '__all__'

class SaveShipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ship
        fields = '__all__'

class SavePersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'


