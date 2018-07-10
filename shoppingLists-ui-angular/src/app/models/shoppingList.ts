export class ShoppingList{
    
    id: number;
    name: string;
    items:  ShoppingListItem[];
}

export class ShoppingListItem {
    id: number;
    name: string;
    purchased: boolean;
}