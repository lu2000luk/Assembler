<script>
// @ts-nocheck

    let { data } = $props();
    let { id } = data;

    import { doc, setDoc, getDoc } from "firebase/firestore"; 
    import { auth, firestore } from '$lib/firebase';
    import { browser } from '$app/environment';

    import Text from '$lib/components/text.svelte';
    import Group from "$lib/components/group.svelte";
    import Button from "$lib/components/button.svelte";
    import Input from "$lib/components/input.svelte";
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
        }
    }

    let build = $state({
        components: [
            {
                id: "text1",
                type: "text",
                props: {
                    text: "Hello world!",
                    size: 4
                }
            },
            {
                id: "group1",
                type: "group",
                props: {
                    gap: 10
                },
                children: [
                    {
                        id: "input1",
                        type: "input",
                        props: {
                            placeholder: "Write here..."
                        }
                    },
                    {
                        id: "button1",
                        type: "button",
                        props: {
                            text: "Click me!"
                        }
                    }
                ]
            }
        ]
    });

    async function getBuild() {
        return;

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