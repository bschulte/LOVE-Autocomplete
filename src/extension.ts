'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { LUA_MODE } from './luaMode';
import { getSuggestions } from './loveAutocomplete'
import { LoveSignatureHelpProvider } from './loveFuncitonSuggestions';

export const EXT_TAG = "LOVE-Autocomplete";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "love-autocomplete" is now active!');

    // Setup our plugin to help with function signatures
    context.subscriptions.push(vscode.languages.registerSignatureHelpProvider(LUA_MODE, new LoveSignatureHelpProvider(vscode.workspace.getConfiguration('lua')['docsTool']), '(', ','));

    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(LUA_MODE, {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.CompletionItem[] {

            let filename = document.fileName;
            let lineText = document.lineAt(position.line).text;
            let lineTillCurrentPosition = lineText.substr(0, position.character);

            let wordAtPosition = document.getWordRangeAtPosition(position);
            let currentWord = '';
            if (wordAtPosition && wordAtPosition.start.character < position.character) {
                let word = document.getText(wordAtPosition);
                currentWord = word.substr(0, position.character - wordAtPosition.start.character);
            }

            // Check if we don't have any '.'s in the line and the letter starts with 'l'
            // If so, return love as a suggestions
            var count = (lineText.match(/\./g) || []).length;
            if (count == 0 && currentWord == "l") {
                let suggestion: vscode.CompletionItem = new vscode.CompletionItem("love", vscode.CompletionItemKind.Module);
                suggestion.detail = EXT_TAG;
                suggestion.documentation = "LOVE 2D Game Framework";
                return [suggestion];
            }

            // Check through the list of functions that are included in this file and see if any match
            // the starting letter of the word we have so far
            let suggestions: vscode.CompletionItem[] = getSuggestions(lineText, currentWord);

            return suggestions;

        }
    }, '.'));
}

// this method is called when your extension is deactivated
export function deactivate() {
}