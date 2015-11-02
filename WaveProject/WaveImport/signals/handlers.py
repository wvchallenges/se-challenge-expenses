from django.db.models.signals import post_save
from django.dispatch import receiver

from WaveImport.models import CSVDocument
from WaveImport.wave_imports import CSVBatch, WaveCVSImportErr

@receiver(post_save, sender=CSVDocument)
def csv_post_save(sender, instance, created, **kwargs):
    try:
        CSVBatch(instance)
    except WaveCVSImportErr:#perhaps additional handling in the future
        pass