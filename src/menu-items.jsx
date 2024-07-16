const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/dashboard'
        }
      ]
    },
    {
      id: 'crm',
      title: 'CRM',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'customers',
          title: 'Customers',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'retailers',
              title: 'Retailers',
              type: 'item',
              url: '/retailers'
            },
            {
              id: 'suppliers',
              title: 'Suppliers',
              type: 'item',
              url: '/suppliers'
            },
            {
              id: 'company',
              title: 'Company',
              type: 'item',
              url: '/company'
            }
          ]
        },
        {
          id: 'orders',
          title: 'Orders',
          type: 'item',
          icon: 'feather icon-box',
          url: '/orders'
        },
        {
          id: 'products',
          title: 'Products',
          type: 'item',
          icon: 'feather icon-box',
          url: '/products'
        },
        {
          id: 'ads',
          title: 'Advertisment',
          type: 'item',
          icon: 'feather icon-box',
          url: '/ads'
        },
      ]
    },
    {
      id: 'global',
      title: 'Global',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'variables',
          title: 'Variables',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'businessTypes',
              title: 'Business Types',
              type: 'item',
              url: '/businessTypes'
            },
            {
              id: 'categoryTypes',
              title: 'Category Types',
              type: 'item',
              url: '/categoryTypes'
            },
            {
              id: 'itemTypes',
              title: 'Item Types',
              type: 'item',
              url: '/itemTypes'
            },
            {
              id: 'packagingTypes',
              title: 'Packaging Types',
              type: 'item',
              url: '/packagingTypes'
            }
          ]
        }
      ]
    },
    {
      id: 'settings',
      title: 'Settings',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'roles',
          title: 'Roles',
          type: 'item',
          icon: 'feather icon-box',
          url: '/admin'
        },
        {
          id: 'feedback',
          title: 'Feedback',
          type: 'item',
          icon: 'feather icon-box',
          url: '/feedback'
        }
      ]
    },
  ]
};

export default menuItems;
