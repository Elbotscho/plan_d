# Generated by Django 4.2.14 on 2024-07-26 12:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('business_expansion', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='fleet',
            name='size',
        ),
        migrations.RemoveField(
            model_name='ship',
            name='fleet',
        ),
        migrations.RemoveField(
            model_name='ship',
            name='size',
        ),
        migrations.AddField(
            model_name='fleet',
            name='ships',
            field=models.ManyToManyField(related_name='fleets', to='business_expansion.ship'),
        ),
        migrations.AlterField(
            model_name='fleet',
            name='admiral',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='fleet', to='business_expansion.person'),
        ),
        migrations.AlterField(
            model_name='person',
            name='stationed_currently',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='current_stationed_people', to='business_expansion.ship'),
        ),
        migrations.AlterField(
            model_name='person',
            name='stationed_past',
            field=models.ManyToManyField(blank=True, related_name='past_stationed_people', to='business_expansion.ship'),
        ),
    ]
