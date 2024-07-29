from django.db import models

class Person(models.Model):
    RANK_CHOICES = [
        ('Recruit', 'Recruit'),
        ('Lieutenant', 'Lieutenant'),
        ('Captain', 'Captain'),
        ('Commander', 'Commander'),
        ('Admiral', 'Admiral'),
    ]
    
    name = models.CharField(max_length=100)
    rank = models.CharField(max_length=20, choices=RANK_CHOICES)
    stationed_currently = models.ForeignKey('Ship', on_delete=models.SET_NULL, null=True, related_name='crew')
    stationed_past = models.ManyToManyField('Ship', related_name='past_stationed_people', blank=True)

    def __str__(self):
        return self.name

class Ship(models.Model):
    name = models.CharField(max_length=100)
    fleet = models.ForeignKey('Fleet', on_delete=models.SET_NULL, null=True, related_name='ship')
    
    def size(self):
        return self.crew.count()

    def ranks(self):
        return self.crew.values_list('rank', flat=True).distinct().count()

    def __str__(self):
        return self.name

class Fleet(models.Model):
    name = models.CharField(max_length=100)
    admiral = models.ForeignKey(Person, on_delete=models.SET_NULL, null=True, related_name='fleet')

    def size(self):
        return self.ship.count()

    def ranks(self):
        # Um die Ränge in der gesamten Flotte zu berechnen, benötigen wir die Ränge aller Besatzungen der Schiffe.
        return self.ship.values_list('crew__rank', flat=True).distinct().count()

    def __str__(self):
        return self.name
