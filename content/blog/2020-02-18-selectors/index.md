---
title: "How to Implement Dynamic Client-Side Data Filtering with Selectors"
date: "2020-02-18"
---

Everybody loves a good visualization. I built one that knocked it out of the park for a client recently. I figure you know your dataset is sticky when your clients immediately want more. So naturally, when my product owner came back to me with a set of fresh requests for various UI knobs the client can use to explore the data, we were ready to deliver it to them ASAP. We would create a set of filter panels, to select data much in the same way you could with any SQL query.

Since these filters resemble simple database operations, at first I thought to implement these filters on the server side. In general I try to do as much data shaping as possible on the server side to save the client’s computer from unnecessary rendering. It might even be good to cache the results of these filters as well. However, since these requests happen separately from the initial page load, it would be way more expensive in terms of round-trip network time to filter this data on the server side.

So now we know roughly what our requirements are. We must be able to filter by a complex set of requirements, and we must do so on the client side. So where do we filter the data? Luckily, we have a Redux store. Surely it should be able to help us manage this complex state. In Redux we usually transform state as a result of an action inside the reducers. So to implement a filter, we might write a reducer like this:

```
case FILTER_APPLES:
    return {
        ...state,
        shipments: _.filter(state.shipments, shipment => {
            return shipment.type != 'Apples';
    });
};
```

This way, you have a set of your filtered items that was created only once, that all your components can use. But you also want to be able to put them back. Maybe you could do something like this?

```
case FILTER_APPLES:
    return {
        ...state,
        filteredShipments: _.filter(state.shipments, shipment => {
            return shipment.type != 'Apples';
        });
    };
case ADD_APPLES:
    return {
        ...state,
        filteredShipments: state.shipments
    };
};
```

This would work for just one filter. But with the Oranges filter, the Date filter, you’d have to somehow check each one in the reducer for each one. This is also screaming of a redux antipattern: you’re not really supposed to read state in the reducers, just write, and your data could be out of stale here.

So what in the world do we do? What I found on the subject confirms the suspicion of an anti-pattern: our state is our “source of truth,” we shouldn’t eliminate state on the basis of a temporary filter. The only thing we need the state to store is whether the filter is on or not. The filter should indeed be part of the render cycle for the component, and the function responsible for preparing the state for a view is good old mapDispatchToProps:

```
function mapStateToProps(state) {
   return {
       filteredList: () => {
           if (state.filterApples) {
               return _.filter(shipments, shipment => {
                   return shipment.type != 'Apples';
               });
           } else {
               return shipments;
           }
       },
   };
}
```

You could nest several filter functions this way. However, we run back into the original problem: we don’t want to run several nested filters every time a component re-renders. That, and we might want to use it in more than one component.

This is where the all-powerful reselect extension comes into play. They’re specifically meant to produce derived data from the state. In addition to allowing you to modularize the functionality in your mapStateToProps, selectors do not get computed until one of their arguments change. This means that we can rewrite our filter functionality to look like this:

```
const getApples = state => {
   if (state.filterApples) {
       return _.filter(shipments, shipment => {
           return shipment.type == 'Apples';
       });
   } else {
       return [];
   }
};
 
const getOranges = state => {
   if (state.filterOranges) {
       return _.filter(shipments, shipment => {
           return shipment.type == 'Oranges';
       });
   } else {
       return [];
   }
};
 
const getFilteredList = createSelector(
   [getShipments, getApples, getOranges],
   (shipments, apples, oranges) => {
       return _.difference(shipments, apples, oranges);
   }
);
```

After importing this function, we can then call it in mapStateToProps like so:

```
function mapStateToProps(state) {
   return {
       filteredStatements: getFilteredList(state),
   };
}
```

This solves our code repetition problem. (Using _.difference to remove your filtered sets will work as long as you don’t have any duplicates.) Also, this function won’t run unless the state actually changes.

But wait, if you dropped a couple of console.logs in here, you’d notice that whenever the Apples filter runs, the Oranges filter also runs! That’s not much different than before. If anything changes in the state, these filters still have to run again. How do we get the level of specificity afforded to us by reducers?

Turns out this code needs one more thing to really shine. When we use the createSelector() function, the selector then listens for one of its arguments to change. Since the argument functions require the whole state, the selector calls those functions whenever the whole state changes. We need to give these functions just a piece of state instead, like so:

```
const getFilterOranges = state => state.filterOranges;
const getFilterApples = state => state.filterApples;
```

And turn the filter functions into their own selectors that will only run when these two functions change.

```
const getRisk = createSelector([getShipments, getFilterOranges], (shipments, filterOranges) => {
   if (state.filterOranges) {
       return _.filter(shipments, shipment => {
           return shipment.type == 'Oranges';
       });
   } else {
       return [];
   }
};
 
const getFilteredList = createSelector(
   [getShipments, getApples, getOranges],
   (shipments, apples, oranges) => {
       return _.difference(shipments, apples, oranges);
   }
);
```

Thanks to the boolean in the redux store, we can now filter this data view from any component we like, and thanks to the selector, the filter will only re-run when the filter is turned on or off, or if new shipments come in. Congratulations on your fantastic component!