export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('favorites');
        if (serializedState === null) {
            return undefined; // Return undefined to let the reducers initialize the state
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('favorites', serializedState);
    } catch (err) {
        console.error(err)
    }
};
