import { persist } from "zustand/middleware";
import { create } from "zustand";
import { Product } from "../sanity.types"; // Assuming Product is defined elsewhere

export interface BasketItem {
  image: string | null; // Use a more specific type (string for URL)
  _id: string;
  name: string;
  product: Product;
  quantity: number;
  price: number ;
}

interface BasketState {
  items: BasketItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => BasketItem[];
}

const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const existingItem = get().items.find(
          (item) => item.product._id === product._id
        );

        if (existingItem) {
          set((state) => ({
            items: state.items.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }));
        } else {
          set((state) => ({
            items: [
              ...state.items,
              {
                product,
                quantity: 1,
                price: product.price ?? 0,
                image: typeof product.image === 'string' ? product.image : null,
                _id: product._id ?? "",
                name: product.name ?? "",
              },
            ],
          }));
        }
      },
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as BasketItem[]),
        })),
      clearBasket: () => {
        set({ items: [] });
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          return total + (item.product.price ?? 0) * item.quantity;
        }, 0);
      },
      getItemCount: (productId) => {
        const item = get().items.find(
          (item) => item.product._id === productId
        );
        return item ? item.quantity : 0;
      },
      getGroupedItems: () => {
        return get().items;
      },
    }),
    {
      name: "basket-store",
    }
  )
);

export default useBasketStore;


// import { persist } from "zustand/middleware";
// import { create } from "zustand";
// import { Product } from "../sanity.types";

// export interface BasketItem {
//   image: any;
//   _id: any;
//   name: string;
//   product: Product;
//   quantity: number;
//   price: number;
// }

// interface BasketState {
//   items: BasketItem[];
//   addItem: (product: Product) => void;
//   removeItem: (productId: string) => void;
//   clearBasket: () => void;
//   getTotalPrice: () => number;
//   getItemCount: (productId: string) => number;
//   getGroupedItems: () => BasketItem[];
// }


// const useBasketStore = create<BasketState>()(
//   persist(
//     (set, get) => ({
//       items: [],

//       // Add item to the basket
//       addItem: (product) => {
//         set((state) => {
//           const existingItem = state.items.find(
//             (item) => item.product._id === product._id
//           );
//           if (existingItem) {
//             // Increase quantity if the item already exists
//             return {
//               items: state.items.map((item) =>
//                 item.product._id === product._id
//                   ? { ...item, quantity: item.quantity + 1 }
//                   : item
//               ),
//             };
//           } else {
//             // Add new item with required properties
//             return {
//               items: [
//                 ...state.items,
//                 {
//                   product,
//                   quantity: 1,
//                   price: product.price ?? 0,
//                   image: product.image ?? null,
//                   _id: product._id ?? "",
//                   name: product.name ?? "",
//                 },
//               ],
//             };
//           }
//         });
//       },

//       // Remove item from the basket
//       removeItem: (productId) =>
//         set((state) => ({
//           items: state.items.reduce((acc, item) => {
//             if (item.product._id === productId) {
//               // Decrease quantity if more than 1
//               if (item.quantity > 1) {
//                 acc.push({ ...item, quantity: item.quantity - 1 });
//               }
//             } else {
//               acc.push(item);
//             }
//             return acc;
//           }, [] as BasketItem[]),
//         })),

//       // Clear the entire basket
//       clearBasket: () => {
//         set({ items: [] });
//       },

//       // Get total price of items in the basket
//       getTotalPrice: () => {
//         return get().items.reduce((total, item) => {
//           return total + (item.product.price ?? 0) * item.quantity;
//         }, 0);
//       },

//       // Get the quantity of a specific item
//       getItemCount: (productId) => {
//         const item = get().items.find((item) => item.product._id === productId);
//         return item ? item.quantity : 0;
//       },

//       // Get grouped items (all items in the basket)
//       getGroupedItems: () => {
//         return get().items;
//       },
//     }),
//     {
//       name: "basket-store", // Key for local storage persistence
//     }
//   )
// );

// export default useBasketStore;



