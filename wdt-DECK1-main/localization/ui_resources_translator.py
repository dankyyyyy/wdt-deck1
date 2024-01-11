import json

class UIResourcesTranslator:
    def __init__(self, locale):
        self.locale = locale
        self.translations = self.load_translations(locale)

    def load_translations(self, locale):
        file_path = f"./translations/ui_{locale}.json"
        with open(file_path, 'r') as file:
            return json.load(file)

    def get_translation(self, key):
        return self.translations.get(key, "Unknown key")
