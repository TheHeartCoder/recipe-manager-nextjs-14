export const CATEGORY = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Dessert',
    'Drinks',
    'Snacks',
    'Appetizers',
    'Salads',
    'Soups',
    'Pasta',
    'Pizza',
    'Sandwiches',
    'Sushi',
    'Seafood',
    'Breads',
    'Bakery',
    'Cakes',
    'Coffee',
    'Thai',
    'Beverages',
    'Smoothies',
    'Juices',
    'Japanese',
    'Indian',
    'Italian',
    'Mexican'
];

export const sortMethods: any = {
    NewestFirst: {
        label: 'Newest First',
        orderBy: { createdAt: 'desc' },
        sortBy: { createdAt: -1 }
    },
    LessCookingTime: {
        label: 'Less Cooking Time',
        orderBy: { cookingTimeInMinutes: 'asc' },
        sortBy: { cookingTimeInMinutes: 1 }
    },
    BestRated: {
        label: 'Best Rated',
        orderBy: { rating: 'desc' },
        sortBy: { rating: -1 }
    }
};
