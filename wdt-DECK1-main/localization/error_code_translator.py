import json

class ErrorCodeTranslator:
    def __init__(self):
        self.translations = {}
        self.load_translations("en", "./translations/error_codes_danish.json")
        self.load_translations("da", "./translations/error_codes_english.json")

    def load_translations(self, locale, file_path):
        with open(file_path, 'r') as file:
            self.translations[locale] = json.load(file)

    def get_translation(self, locale, error_code, **kwargs):
        message = self.translations.get(locale, {}).get(error_code, "Unknown error code")
        return message.format(**kwargs)
