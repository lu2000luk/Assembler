import Text from '$lib/components/text.svelte';
import Group from "$lib/components/group.svelte";
import Button from "$lib/components/button.svelte";
import Input from "$lib/components/input.svelte";
import Separator from "$lib/components/separator.svelte";
import Textarea from "$lib/components/textarea.svelte";
import Video from '$lib/components/video.svelte';
import Image from '$lib/components/image.svelte';
import Link from '$lib/components/link.svelte';

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
    },
    "textarea": {
        component: Textarea,
        props: {
            placeholder: "Write here...",
            rows: 4,
            cols: 50
        },
        idPrefix: "textarea",
        canHaveChildren: false,
        availableEvents: ["change", "focus", "click"]
    },
    "video": {
        component: Video,
        props: {
            src: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
            width: 560,
            height: 315,
        },
        idPrefix: "video",
        canHaveChildren: false,
        availableEvents: ["play", "pause", "ended"]
    },
    "image": {
        component: Image,
        props: {
            src: "https://via.placeholder.com/150",
            width: 150,
            height: 150,
            alt: "Image"
        },
        idPrefix: "image",
        canHaveChildren: false,
        availableEvents: ["click"]
    },
    "link": {
        component: Link,
        props: {
            text: "Click me!",
            href: "https://example.com"
        },
        idPrefix: "link",
        canHaveChildren: false,
        availableEvents: ["click"]
    }
}

export const eventCodePrefix = `
    function getComponentById(id) {
        return document.getElementById("c_"+id);
    };
`;