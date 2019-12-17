from django.apps import AppConfig

class WaveImportConfig(AppConfig):
    name = 'WaveImport'
    verbose_name = "WaveImport"
    
    def ready(self):
        import WaveImport.signals.handlers