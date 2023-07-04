export default {
    editor: {
        label: {
            en: 'Website Loader',
        },
        icon: 'fontawesome/solid/spinner',
    },
    properties: {
        backgroundColor: {
            type: 'Color',
            label: {
                en: 'Background color',
                fr: 'Couleur du fond',
            },
            bindable: true,
            options: {
                nullable: true,
            },
            responsive: true,
            defaultValue: '#FFFFFF',
            classes: true,
        },
        duration: {
            type: 'Length',
            label: {
                en: 'Hide after',
                fr: 'Cacher après',
            },
            section: 'settings',
            options: {
                unitChoices: [{ value: 's', label: 's' }],
            },
            responsive: true,
            defaultValue: '3s',
        },
        wwObjects: {
            hidden: true,
            defaultValue: [],
        },
    },
};
