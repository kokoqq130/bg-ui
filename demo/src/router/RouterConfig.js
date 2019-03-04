export default [{
    path: '/guide',
    exact: true,
    page: () => { return import('../component/pages/components/Home/Page'); },
}, {
    path: '/towrite',
    exact: true,
    page: () => { return import('../component/pages/components/ToWrite/Page'); },
}, {
    path: '/test',
    exact: true,
    page: () => { return import('../component/pages/components/AppBar/Page'); },
}, {
    path: '/testservice',
    exact: true,
    page: () => { return import('../component/pages/components/Test/Page'); },
}, {
    path: '/new',
    exact: true,
    page: () => { return import('../component/pages/components/New/Page'); },
}];
