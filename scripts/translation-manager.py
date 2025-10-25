# SPDX-License-Identifier: Apache-2.0
# Copyright (c) 2025 Rebecca "Bekalah" Lemke and contributors
#
# Cathedral of Circuits - Translation Management Script

import json
import os
import argparse
from pathlib import Path
import requests
import time

class TranslationManager:
    """Manages translations for Cathedral of Circuits universal accessibility"""
    
    def __init__(self):
        self.project_root = Path(__file__).parent.parent
        self.locales_dir = self.project_root / 'locales'
        self.base_language = 'en'
        
        # Supported languages with their native names
        self.supported_languages = {
            'en': 'English',
            'es': 'Español', 
            'fr': 'Français',
            'de': 'Deutsch',
            'pt': 'Português',
            'it': 'Italiano',
            'ru': 'Русский',
            'zh-CN': '中文（简体）',
            'ja': '日本語',
            'ko': '한국어',
            'ar': 'العربية',
            'hi': 'हिन्दी'
        }
        
        # Translation files structure
        self.translation_files = [
            'interface.json',
            'safety.json', 
            'accessibility.json',
            'arcana.json',
            'healing.json'
        ]
        
    def create_language_structure(self, language_code):
        """Create directory structure for a new language"""
        if language_code not in self.supported_languages:
            raise ValueError(f"Language {language_code} not supported")
            
        lang_dir = self.locales_dir / language_code
        lang_dir.mkdir(parents=True, exist_ok=True)
        
        # Create empty translation files
        for file_name in self.translation_files:
            file_path = lang_dir / file_name
            if not file_path.exists():
                # Copy structure from English with empty strings
                self.create_empty_translation_file(file_path, file_name)
                
        print(f"Created language structure for {self.supported_languages[language_code]} ({language_code})")
    
    def create_empty_translation_file(self, file_path, file_name):
        """Create an empty translation file with proper structure"""
        base_file = self.locales_dir / self.base_language / file_name
        
        if base_file.exists():
            with open(base_file, 'r', encoding='utf-8') as f:
                base_data = json.load(f)
            
            # Create empty version (preserve structure, empty strings)
            empty_data = self.empty_translation_structure(base_data)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(empty_data, f, ensure_ascii=False, indent=2)
        else:
            # Create minimal structure
            minimal_structure = {
                "_license": "SPDX-License-Identifier: CC-BY-NC-SA-4.0",
                "_copyright": "Copyright (c) 2025 Rebecca 'Bekalah' Lemke",
                "_notice": f"Translation content under CC BY-NC-SA 4.0. Language: {file_path.parent.name}",
                "_source": "https://github.com/Bekalah/cathedral",
                "_translator": "",
                "_status": "incomplete"
            }
            
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(minimal_structure, f, ensure_ascii=False, indent=2)
    
    def empty_translation_structure(self, data):
        """Recursively create empty translation structure"""
        if isinstance(data, dict):
            result = {}
            for key, value in data.items():
                if key.startswith('_'):
                    # Preserve metadata, but update for target language
                    result[key] = value
                elif isinstance(value, dict):
                    result[key] = self.empty_translation_structure(value)
                elif isinstance(value, str):
                    result[key] = ""  # Empty string for translation
                else:
                    result[key] = value
            return result
        elif isinstance(data, list):
            return [self.empty_translation_structure(item) for item in data]
        else:
            return data
    
    def validate_translations(self, language_code=None):
        """Validate translation files for completeness and structure"""
        languages_to_check = [language_code] if language_code else list(self.supported_languages.keys())
        
        validation_results = {}
        
        for lang in languages_to_check:
            if lang == self.base_language:
                continue
                
            lang_dir = self.locales_dir / lang
            if not lang_dir.exists():
                validation_results[lang] = {"status": "missing", "files": {}}
                continue
                
            file_results = {}
            for file_name in self.translation_files:
                file_path = lang_dir / file_name
                if not file_path.exists():
                    file_results[file_name] = {"status": "missing"}
                    continue
                    
                # Validate file content
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        translation_data = json.load(f)
                    
                    # Compare with base file
                    base_path = self.locales_dir / self.base_language / file_name
                    if base_path.exists():
                        with open(base_path, 'r', encoding='utf-8') as f:
                            base_data = json.load(f)
                        
                        missing_keys, empty_values = self.compare_translations(base_data, translation_data)
                        
                        file_results[file_name] = {
                            "status": "complete" if not missing_keys and not empty_values else "incomplete",
                            "missing_keys": missing_keys,
                            "empty_values": empty_values,
                            "completion_percentage": self.calculate_completion_percentage(base_data, translation_data)
                        }
                    else:
                        file_results[file_name] = {"status": "no_base_file"}
                        
                except json.JSONDecodeError as e:
                    file_results[file_name] = {"status": "invalid_json", "error": str(e)}
            
            validation_results[lang] = {
                "status": "valid" if all(f.get("status") == "complete" for f in file_results.values()) else "incomplete",
                "files": file_results
            }
        
        return validation_results
    
    def compare_translations(self, base_data, translation_data, path=""):
        """Compare base and translation data to find missing keys and empty values"""
        missing_keys = []
        empty_values = []
        
        if isinstance(base_data, dict):
            for key, value in base_data.items():
                if key.startswith('_'):  # Skip metadata
                    continue
                    
                current_path = f"{path}.{key}" if path else key
                
                if key not in translation_data:
                    missing_keys.append(current_path)
                elif isinstance(value, dict):
                    sub_missing, sub_empty = self.compare_translations(value, translation_data[key], current_path)
                    missing_keys.extend(sub_missing)
                    empty_values.extend(sub_empty)
                elif isinstance(value, str) and translation_data[key] == "":
                    empty_values.append(current_path)
        
        return missing_keys, empty_values
    
    def calculate_completion_percentage(self, base_data, translation_data):
        """Calculate completion percentage of a translation file"""
        total_keys = self.count_translatable_keys(base_data)
        completed_keys = self.count_completed_keys(base_data, translation_data)
        
        if total_keys == 0:
            return 100.0
            
        return (completed_keys / total_keys) * 100.0
    
    def count_translatable_keys(self, data, count=0):
        """Count total translatable keys in base data"""
        if isinstance(data, dict):
            for key, value in data.items():
                if key.startswith('_'):  # Skip metadata
                    continue
                elif isinstance(value, dict):
                    count = self.count_translatable_keys(value, count)
                elif isinstance(value, str):
                    count += 1
        return count
    
    def count_completed_keys(self, base_data, translation_data, count=0):
        """Count completed translation keys"""
        if isinstance(base_data, dict):
            for key, value in base_data.items():
                if key.startswith('_'):  # Skip metadata
                    continue
                elif isinstance(value, dict) and key in translation_data:
                    count = self.count_completed_keys(value, translation_data[key], count)
                elif isinstance(value, str) and key in translation_data and translation_data[key] != "":
                    count += 1
        return count
    
    def generate_translation_report(self):
        """Generate a comprehensive translation status report"""
        validation_results = self.validate_translations()
        
        report = {
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime()),
            "supported_languages": len(self.supported_languages),
            "translation_files": len(self.translation_files),
            "languages": {}
        }
        
        for lang_code, lang_name in self.supported_languages.items():
            if lang_code == self.base_language:
                continue
                
            if lang_code in validation_results:
                result = validation_results[lang_code]
                
                # Calculate overall completion
                total_completion = 0
                completed_files = 0
                
                for file_name, file_result in result["files"].items():
                    if "completion_percentage" in file_result:
                        total_completion += file_result["completion_percentage"]
                        completed_files += 1
                
                overall_completion = total_completion / completed_files if completed_files > 0 else 0
                
                report["languages"][lang_code] = {
                    "name": lang_name,
                    "status": result["status"],
                    "completion_percentage": round(overall_completion, 1),
                    "files": result["files"]
                }
            else:
                report["languages"][lang_code] = {
                    "name": lang_name,
                    "status": "not_started",
                    "completion_percentage": 0.0,
                    "files": {}
                }
        
        return report
    
    def export_for_translators(self, language_code):
        """Export translation files in a translator-friendly format"""
        if language_code not in self.supported_languages:
            raise ValueError(f"Language {language_code} not supported")
        
        export_dir = self.project_root / 'translation-exports' / language_code
        export_dir.mkdir(parents=True, exist_ok=True)
        
        for file_name in self.translation_files:
            base_file = self.locales_dir / self.base_language / file_name
            target_file = self.locales_dir / language_code / file_name
            
            if not base_file.exists():
                continue
            
            with open(base_file, 'r', encoding='utf-8') as f:
                base_data = json.load(f)
            
            translation_data = {}
            if target_file.exists():
                with open(target_file, 'r', encoding='utf-8') as f:
                    translation_data = json.load(f)
            
            # Create export format with base and target side by side
            export_data = self.create_export_format(base_data, translation_data)
            
            export_file = export_dir / f"{file_name.replace('.json', '')}_for_translation.json"
            with open(export_file, 'w', encoding='utf-8') as f:
                json.dump(export_data, f, ensure_ascii=False, indent=2)
        
        print(f"Translation files exported for {self.supported_languages[language_code]} in {export_dir}")
    
    def create_export_format(self, base_data, translation_data, path=""):
        """Create translator-friendly export format"""
        result = {}
        
        if isinstance(base_data, dict):
            for key, value in base_data.items():
                if key.startswith('_'):
                    result[key] = value
                    continue
                
                current_path = f"{path}.{key}" if path else key
                
                if isinstance(value, dict):
                    result[key] = self.create_export_format(
                        value, 
                        translation_data.get(key, {}), 
                        current_path
                    )
                elif isinstance(value, str):
                    result[key] = {
                        "base": value,
                        "translation": translation_data.get(key, ""),
                        "path": current_path,
                        "status": "complete" if translation_data.get(key, "") != "" else "needs_translation"
                    }
                else:
                    result[key] = value
        
        return result

def main():
    parser = argparse.ArgumentParser(description='Cathedral of Circuits Translation Manager')
    parser.add_argument('command', choices=['create', 'validate', 'report', 'export'], 
                       help='Command to execute')
    parser.add_argument('--language', '-l', help='Language code (e.g., es, fr, de)')
    parser.add_argument('--output', '-o', help='Output file for reports')
    
    args = parser.parse_args()
    
    manager = TranslationManager()
    
    if args.command == 'create':
        if not args.language:
            print("Error: --language required for create command")
            return
        manager.create_language_structure(args.language)
    
    elif args.command == 'validate':
        results = manager.validate_translations(args.language)
        print(json.dumps(results, indent=2))
    
    elif args.command == 'report':
        report = manager.generate_translation_report()
        
        if args.output:
            with open(args.output, 'w', encoding='utf-8') as f:
                json.dump(report, f, ensure_ascii=False, indent=2)
            print(f"Report saved to {args.output}")
        else:
            print(json.dumps(report, indent=2))
    
    elif args.command == 'export':
        if not args.language:
            print("Error: --language required for export command")
            return
        manager.export_for_translators(args.language)

if __name__ == '__main__':
    main()