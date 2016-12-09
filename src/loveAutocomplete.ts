import * as vscode from 'vscode';
import { api } from './luaApi';
import { EXT_TAG } from './extension';

export function getSuggestions(line: string, currentWord: string) {
    var results: vscode.CompletionItem[] = [];

    let apiItems: string[];

    // We'll figure out which part of the method we're on currently so we can figure out which item to suggest
    // This means that if the current word is empty, we've gotten here after typing a '.'
    // We'll split the string on '.' and grab the second to (because the last will be the empty string) last entry in
    // the resulting array to be our target key
    // we're looking for in the API array
    if (currentWord == "") {
        let words = line.trim().split('.');
        let targetKey = words[words.length - 2];
        console.log("Target key in API array:", targetKey);
        apiItems = getProperArray(targetKey);
    } else {
        apiItems = [];
    }

    // Create the array of CompletionItems
    for (var key in apiItems) {
        // skip loop if the property is from prototype
        if (!apiItems.hasOwnProperty(key)) continue;

        var details: any = apiItems[key];
        
        // Check on the type of completion item it will be
        if (details.type == "module") {
            var completionType = vscode.CompletionItemKind.Module;
        } else {
            var completionType = vscode.CompletionItemKind.Function;
        }

        let newItem = new vscode.CompletionItem(key, completionType);
        newItem.detail = EXT_TAG;
        newItem.documentation = details.details;
        results.push(newItem);
    }

    return results;
}

function getProperArray(lookingForKey: string): Array<string> {
    let results: Array<string>;

    // Find the right key in the API array to return the results
    for (var key in api) {
        if (api.hasOwnProperty(key)) {
            if (key == lookingForKey) {
                return api[key];
            }
        }
    }

    return results;
}