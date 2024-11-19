import Text from '$lib/components/text.svelte';
import Group from "$lib/components/group.svelte";
import Button from "$lib/components/button.svelte";
import Input from "$lib/components/input.svelte";
import Separator from "$lib/components/separator.svelte";

export const components = {
    "text": {
        component: Text,
        props: {
            text: "Text here...",
            size: 1
        },
        idPrefix: "text",
        canHaveChildren: false,
        availableEvents: []
    },
    "group": {
        component: Group,
        props: {
            gap: 10
        },
        idPrefix: "group",
        canHaveChildren: true,
        availableEvents: ["focus"]
    },
    "button": {
        component: Button,
        props: {
            text: "Text here..."
        },
        idPrefix: "button",
        canHaveChildren: false,
        availableEvents: ["click"]
    },
    "input": {
        component: Input,
        props: {
            placeholder: "Write here..."
        },
        idPrefix: "input",
        canHaveChildren: false,
        availableEvents: ["change", "focus", "click"]
    },
    "separator": {
        component: Separator,
        props: {
            distance: 1
        },
        idPrefix: "separator",
        canHaveChildren: false,
        availableEvents: []
    }
}

export const eventCodePrefix = `
    console.log("Event fired!");

    function getComponentById(id) {
        return document.getElementById("c_"+id);
    };
`;