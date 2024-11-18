<script>
// @ts-nocheck

    let { data } = $props();
    let { id } = data;

    import { doc, setDoc, getDoc } from "firebase/firestore"; 
    import { auth, firestore } from '$lib/firebase';
    import { browser } from '$app/environment';
    import Plus from "lucide-svelte/icons/plus";

    import Text from '$lib/components/text.svelte';
    import Group from "$lib/components/group.svelte";
    import Button from "$lib/components/button.svelte";
    import Input from "$lib/components/input.svelte";
    import Separator from "$lib/components/separator.svelte";
    const components = {
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

    let componentIcons = {
        "text": "📝",
        "group": "📦",
        "button": "🔘",
        "input": "📄",
        "separator": "➖"
    }

    let build = $state({ components: [] });
    let addingComponent = $state(false);

    async function getBuild() {
        let docRef = doc(firestore, "projects", id);
        let docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            build = JSON.parse(docSnap.data().data);
        } else {
            console.log("No such document!");
            if (browser) {
                location.href = '/';
            }
        }
    }

    function addComponent(name) {
        let newComponent = {
            type: name,
            id: Math.random().toString(36).substring(7),
            props: components[name].props
        }

        build.components.push(newComponent);
        addingComponent = false;
    }
</script>

{#await getBuild()}
    <div>Loading...</div>
{:then}
    <div class="editorWrapper flex justify-center items-center w-full h-full border-2 border-accent">
        <div class="editorWindow w-full h-full overflow-y-auto">
            <div class="renderedContent flex items-center flex-col mt-24">
                {#each build.components as component}
                    {#if components[component.type]}
                        <!-- svelte-ignore svelte_component_deprecated -->
                        <svelte:component this={components[component.type].component} args={component.props} id={"c_"+components[component.type].idPrefix+"_"+component.id}>
                            {#if components[component.type].canHaveChildren}
                                {#each component.children as child}
                                    {#if components[child.type]}
                                        <!-- svelte-ignore svelte_component_deprecated -->
                                        <svelte:component this={components[child.type].component} args={components[child.type].props} id={"c_"+components[component.type].idPrefix+"_"+child.id} />
                                    {/if}
                                {/each}
                            {/if}
                        </svelte:component>
                        <br>
                    {/if}
                {/each}
                <div class="newComponent">
                    {#if addingComponent}
                        <div class="flex gap-2 flex-col border-2 border-accent p-6 rounded-lg backdrop-blur-sm max-h-64 overflow-y-auto ">
                            {#each Object.keys(components) as component}
                                <button class="hover:bg-accent flex gap-2 text-text border-2 border-accent py-2 px-24 bg-background bg-opacity-15 backdrop-blur transition-all duration-200 rounded-lg" onclick={() => {addComponent(component)}}>
                                    {componentIcons[component]} {component[0].toUpperCase() + component.slice(1)}
                                </button>
                            {/each}
                        </div>
                    {:else}
                        <button class="hover:bg-accent flex gap-2 text-text border-2 border-accent py-2 px-24 bg-background bg-opacity-15 backdrop-blur transition-all duration-200 rounded-lg" onclick={() => addingComponent = true}>
                            <Plus class="text-text" />
                            Add new component
                        </button>
                    {/if}
                    
                </div>
            </div>
        </div>
    </div>
{:catch error}
    <div>{error.message}</div>
{/await}

<style>
    .editorWrapper {
        margin: 10px;
        width: calc(100% - 20px);
        background-color: #1a1a1a;
    }

    .editorWindow {
        background: url("../../grid_bg.svg");
        background-size: 10%;
        background-repeat: repeat;
    }
</style>