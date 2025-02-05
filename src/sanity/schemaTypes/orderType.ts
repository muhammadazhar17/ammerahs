import { BasketIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const orderType = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  icon: BasketIcon,
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stripeCheckoutSessionId',
      title: 'Stripe Checkout Session ID',
      type: 'string',
    }),
    defineField({
      name: 'stripeCustomerId',
      title: 'Stripe Customer ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'clerkUserId',
      title: 'Clerk User ID',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stripePaymentIntentId',
      title: 'Stripe Payment Intent ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{ type: 'product' }],
            }),
            defineField({
              name: 'quantity',
              title: 'Quantity Purchased',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              title: 'product.name',
              quantity: 'quantity',
              image: 'product.image',
              price: 'product.price',
              currency: 'product.currency',
            },
            prepare({ title, quantity, price, currency, image }) {
              return {
                title,
                subtitle: `${quantity} x ${price} ${currency}`,
                media: image,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'discountAmount',
      title: 'Discount Amount',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Paid', value: 'paid' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Canceled', value: 'canceled' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'totalPrice',
      currency: 'currency',
    },
    prepare({ title, subtitle, currency }) {
      return {
        title,
        subtitle: `${subtitle} ${currency}`,
      };
    },
  },
});



// import { BasketIcon } from '@sanity/icons';
// import { defineArrayMember, defineField, defineType } from 'sanity';

// export const orderType = defineType({
//   name: 'order',
//   title: 'Order',
//   type: 'document',
//   icon: BasketIcon,
//   fields: [
//     defineField({
//       name: 'orderNumber',
//       title: 'Order Number',
//       type: 'string',
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: 'stripeCheckoutSessionId',
//       title: 'Stripe Checkout Session ID',
//       type: 'string',
//     }),
//     defineField({
//       name: 'stripeCustomerId',
//       title: 'Stripe Customer ID',
//       type: 'string',
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: 'customerName',
//       title: 'Customer Name',
//       type: 'string',
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: 'customerEmail',
//       title: 'Customer Email',
//       type: 'string',
//       validation: (Rule) => Rule.required().email(),
//     }),
//     defineField({
//       name: 'clerkUserId',
//       title: 'Clerk User ID',
//       type: 'number',
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: 'stripePaymentIntentId',
//       title: 'Stripe Payment Intent ID',
//       type: 'string',
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: 'products',
//       title: 'Products',
//       type: 'array',
//       of: [
//         defineArrayMember({
//           type: 'object',
//           fields: [
//             defineField({
//               name: 'product',
//               title: 'Product',
//               type: 'reference',
//               to: [{ type: 'product' }],
//             }),
//             defineField({
//               name: 'quantity',
//               title: 'Quantity Purchased',
//               type: 'number',
//               validation: (Rule) => Rule.required().min(1),
//             }),
//           ],
//           preview: {
//             select: {
//               title: 'product.name',
//               quantity: 'quantity',
//               image: 'product.image',
//               price: 'product.price',
//               currency: 'product.currency',
//             },
//             prepare({ title, quantity, price, currency, image }) {
//               return {
//                 title,
//                 subtitle: `${quantity} x ${price} ${currency}`,
//                 media: image,
//               };
//             },
//           },
//         }),
//       ],
//     }),
//     defineField({
//       name: 'totalPrice',
//       title: 'Total Price',
//       type: 'number',
//       validation: (Rule) => Rule.required().min(0),
//     }),
//     defineField({
//       name: 'currency',
//       title: 'Currency',
//       type: 'string',
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: 'discountAmount',
//       title: 'Discount Amount',
//       type: 'number',
//       validation: (Rule) => Rule.min(0),
//     }),
//     defineField({
//       name: 'status',
//       title: 'Order Status',
//       type: 'string',
//       options: {
//         list: [
//           { title: 'Pending', value: 'pending' },
//           { title: 'Paid', value: 'paid' },
//           { title: 'Shipped', value: 'shipped' },
//           { title: 'Delivered', value: 'delivered' },
//           { title: 'Canceled', value: 'canceled' },
//         ],
//       },
//       validation: (Rule) => Rule.required(),
//     }),
//   ],
//   preview: {
//     select: {
//       title: 'customerName',
//       subtitle: 'totalPrice',
//       currency: 'currency',
//     },
//     prepare({ title, subtitle, currency }) {
//       return {
//         title,
//         subtitle: `${subtitle} ${currency}`,
//       };
//     },
//   },
// });


// import { BasketIcon } from '@sanity/icons'
// import { markCurrentScopeAsDynamic } from 'next/dist/server/app-render/dynamic-rendering'
// import { defineArrayMember, defineField, defineType } from 'sanity'

// export const orderType = defineType({
//     name: 'order',
//     title: 'Order',
//     type: 'document',
//     icon: BasketIcon,
//     fields: [
//         defineField({
//             name: 'orderNumber',
//             title: 'Order Number',
//             type: 'string',
//             validation: (Rule) => Rule.required(),
//         }),
//         defineField({
//             name: 'StripeCheckoutSessionId',
//             title: 'Stripe Checkout Session Id',
//             type: 'string',
//         }),
//         defineField({
//             name: 'stripeCustomerId',
//             title: 'Stripe Customer Id',
//             type: 'string',
//             validation: (Rule) => Rule.required(),
//         }),
//         defineField({
//             name: 'CustomerNAme',
//             title: 'Customer Name',
//             type: 'string',
//             validation: (Rule) => Rule.required(),
//         }),
//         defineField({
//             name: 'CustomerEmail',
//             title: 'Customer Email',
//             type: 'string',
//             validation: (Rule) => Rule.required(),
//         }),

//         defineField({
//             name: 'clerkUserId',
//             title: 'Clerk User Id',
//             type: 'number',
//             validation: (Rule) => Rule.required(),
//         }),
//         defineField({
//             name: 'stripePaymentIntentId',
//             title: 'Stripe Payment Intent Id',
//             type: 'string',
//             validation: (Rule) => Rule.required(),
//         }),
//         defineField({
//             name: 'products',
//             title: 'Products',
//             type: 'array',
//             of: [
//                 defineArrayMember({
//                     type: 'object',
//                     fields: [
//                         defineField({
//                             name: 'product',
//                             title: 'Product Brought',
//                             type: 'reference',
//                             to: [{ type: 'product' }],
//                         }),
//                         defineField({
//                             name: 'quantity',
//                             title: 'Quantity purchased',
//                             type: 'number',
//                         }),

//                     ],
//                     preview: {
//                         select: {
//                             title: 'product.name',
//                             quantity: 'quantity',
//                             Image: 'product.image',
//                             price: 'product.price',
//                             currency: 'product.currency',

//                         },

//                         prepare(select) {
//                             return {
//                                 title: select.title,
//                                 subtitle: `${select.quantity} x ${select.price} ${select.currency}`,
//                                 media: select.Image,
//                             }
//                         }
//                     }
//                 }),
//                 defineField({
//                     name: 'Totalprice',
//                     title: 'Total Price',
//                     type: 'number',
//                     validation: (Rule) => Rule.required().min(0),
//                 }),
//                 defineField({
//                     name: 'currency',
//                     title: 'Currency',
//                     type: 'string',
//                     validation: (Rule) => Rule.required(),
//                 }),
//                 defineField({
//                     name: 'Discountamount',
//                     title: 'Discount Amount',
//                     type: 'number',
//                     validation: (Rule) => Rule.min(0),
//                 }),
//                 defineField({
//                     name: 'status',
//                     title: 'Order Status',
//                     type: 'string',
//                     options: {
//                         list: [
//                             { title: 'Pending', value: 'pending' },
//                             { title: 'Paid', value: 'paid' },
//                             { title: 'Shipped', value: 'shipped' },
//                             { title: 'Delivered', value: 'delivered' },
//                             { title: 'Canceled', value: 'canceled' },
//                         ],
//                     },
//                     validation: (Rule) => Rule.required(),
//                 })

//            )}
//   ]});


// import { BasketIcon } from '@sanity/icons'
// import { markCurrentScopeAsDynamic } from 'next/dist/server/app-render/dynamic-rendering'
// import { defineArrayMember, defineField, defineType } from 'sanity'

// export const orderType = defineType({
//     name: 'order',
//     title: 'Order',
//     type: 'document',
//     icon: BasketIcon,
//     fields: [
//         defineField({
//             name: 'orderNumber',
//             title: 'Order Number',
//             type: 'string',
//             validation: (Rule) => Rule.required(),
//         }),
//         defineField({
//             name: 'StripeCheckoutSessionId',
//             title: 'Stripe Checkout Session Id',
//             type: 'string',
//         }),
//         defineField({
//             name: 'stripeCustomerId',
//             title: 'Stripe Customer Id',
//             type: 'string',
//             validation: (Rule) => Rule.required(),
//         }),
//         defineField({
//             name: 'CustomerNAme',
//             title: 'Customer Name',
//             type: 'string',
//             validation: (Rule) => Rule.required(),
//         }),
//         defineField({
//             name: 'CustomerEmail',
//             title: 'Customer Email',
//             type: 'string',
//             validation: (Rule) => Rule.required(),
//         }),

//         defineField({
//             name: 'clerkUserId',
//             title: 'Clerk User Id',
//             type: 'number',
//             validation: (Rule) => Rule.required(),
//         }),
//         defineField({
//             name: 'stripePaymentIntentId',
//             title: 'Stripe Payment Intent Id',
//             type: 'string',
//             validation: (Rule) => Rule.required(),
//         }),
//         defineField({
//             name: 'products',
//             title: 'Products',
//             type: 'array',
//             of: [
//                 defineArrayMember({
//                     type: 'object',
//                     fields: [
//                         defineField({
//                             name: 'product',
//                             title: 'Product Brought',
//                             type: 'reference',
//                             to: [{ type: 'product' }],
//                         }),
//                         defineField({
//                             name: 'quantity',
//                             title: 'Quantity purchased',
//                             type: 'number',
//                         }),

//                     ],
//                     preview: {
//                         select: {
//                             title: 'product.name',
//                             quantity: 'quantity',
//                             Image: 'product.image',
//                             price: 'product.price',
//                             currency: 'product.currency',

//                         },

//                         prepare(select) {
//                             return {
//                                 title: select.title,
//                                 subtitle: `${select.quantity} x ${select.price} ${select.currency}`,
//                                 media: select.Image,
//                             }
//                         }
//                     }
//                 }),
//                 defineField({
//                     name: 'Totalprice',
//                     title: 'Total Price',
//                     type: 'number',
//                     validation: (Rule) => Rule.required().min(0),
//                 }),
//                 defineField({
//                     name: 'currency',
//                     title: 'Currency',
//                     type: 'string',
//                     validation: (Rule) => Rule.required(),
//                 }),
//                 defineField({
//                     name: 'Discountamount',
//                     title: 'Discount Amount',
//                     type: 'number',
//                     validation: (Rule) => Rule.min(0),
//                 }),
//                 defineField({
//                     name: 'status',
//                     title: 'Order Status',
//                     type: 'string',
//                     options: {
//                         list: [
//                             { title: 'Pending', value: 'pending' },
//                             { title: 'Paid', value: 'paid' },
//                             { title: 'Shipped', value: 'shipped' },
//                             { title: 'Delivered', value: 'delivered' },
//                             { title: 'Canceled', value: 'canceled' },
//                         ],
//                     },
//                     validation: (Rule) => Rule.required(),
//                 })

//             ],
//         }),
//         },
            
//     ],
// })
    