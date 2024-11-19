<script>
// @ts-nocheck

    let { data } = $props();
    let { id } = data;

    import { doc, setDoc, getDoc } from "firebase/firestore"; 
    import { auth, firestore } from '$lib/firebase';
    import { browser } from '$app/environment';
    import Plus from "lucide-svelte/icons/plus";
    import Trash2 from "lucide-svelte/icons/trash-2";
    import { userStore } from "sveltefire";

    const user = userStore(auth);

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
    let addingChild = $state(false);
    let editingComponent = $state(false);
    let componentEditor = $state();
    let selectedComponent = $state();

    let newComponentScroll = $state();

    let editorIdEdit = $state("");
    let editorPropsEdit = $state({});
    let editorEventsEdit = $state({});

    let editorPropsValues= $state({});

    async function getBuild() {
        let docRef = doc(firestore, "projects", id);
        let docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            build = JSON.parse(docSnap.data().data);
        } else {
            if (browser) {
                alert("No such document!");
                location.href = '/';
            }
        }
    }

    function addComponent(name) {
        let newComponent = {
            type: name,
            id: Math.random().toString(36).substring(7),
            props: components[name].props,
            events: {}
        }

        if (components[name].canHaveChildren) {
            newComponent.children = [];
        }

        build.components.push(newComponent);
        addingComponent = false;
    }

    function addChildren(name, parentId) {
        let newComponent = {
            type: name,
            id: Math.random().toString(36).substring(7),
            props: components[name].props
        }

        let parent = build.components.find(component => component.id === parentId);
        parent.children.push(newComponent);
        addingChild = false;
    }

    let saveBuildButtonText = $state("Save");
    let saveBuildButtonDisabled = $state(false);

    async function saveBuild(ignoreLogging = false) {
        if (!browser) {
            return;
        }

        saveBuildButtonText = "Saving...";
        saveBuildButtonDisabled = true;

        let docRef = doc(firestore, "projects", id);
        try {
            await setDoc(docRef, { data: JSON.stringify(build), owner: $user.uid });
        } catch (e) {
            saveBuildButtonDisabled = false;

            if (ignoreLogging) {
                return;
            };

            saveBuildButtonText = "Error!";
            return;
        }

        saveBuildButtonText = "Saved!";
        saveBuildButtonDisabled = false;

        setTimeout(() => {
            saveBuildButtonText = "Save";
        }, 1500);
    }

    function edit(e) {
        console.log(e);
        editingComponent = false;

        let target = e.target;

        if (target.className.includes("developmentComponent")) {
            target = target.children[0];
        }

        let id = target.id.split("_")[2];

        if (id) {
            let component = build.components.find(component => component.id === id);

            if (!component) {
                build.components.forEach(parent => {
                    if (parent.children) {
                        component = parent.children.find(child => child.id === id);
                    }
                });
            }

            if (!component) {
                return;
            }

            selectedComponent = component;
            editingComponent = true;

            let componentElement = target;

            let componentRect = componentElement.getBoundingClientRect();

            componentEditor.style.top = componentRect.top + "px";
            componentEditor.style.left = (componentRect.right + 20) + "px";

            editorIdEdit = component.id;
            editorPropsEdit = component.props;
            editorEventsEdit = component.events;
            editorPropsValues = component.props;
        }
    }

    function deleteComponent(componentId) {
        let componentIndex = build.components.findIndex(component => component.id === componentId);

        if (componentIndex === -1) {
            build.components.forEach(parent => {
                if (parent.children) {
                    componentIndex = parent.children.findIndex(child => child.id === componentId);
                }
            });
        }

        if (componentIndex !== -1) {
            build.components.splice(componentIndex, 1);
        }
    }

    setInterval(() => {
        try {saveBuild(true);} catch {}
    }, 60000);

    let rebuild = $state(0);
</script>

{#await getBuild()}
    <div>Loading...</div>
{:then}
    <div class="editorWrapper flex justify-center items-center w-full h-full mt-8 border-2 border-accent">
        <!-- svelte-ignore a11y_click_events_have_key_events -->
         <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="editorWindow w-full h-full select-none overflow-y-auto" onclick={edit}>
            <div class="absolute projectSettings m-5">
                <button disabled={saveBuildButtonDisabled} class="hover:bg-accent disabled:hover:bg-background disabled:bg-opacity-85 disabled:border-primary flex gap-2 text-text border-2 border-accent py-2 px-24 bg-background bg-opacity-15 backdrop-blur transition-all duration-200 rounded-lg" onclick={saveBuild}>
                    {saveBuildButtonText}
                </button>
                <br>
                <div class="debug">
                    <p class="text-2xl">Debug options</p>
                    <p>Project ID: {id}</p>
                    <p>Owner: {$user.uid}</p>
                    <div class="flex gap-5">
                        <button class="hover:bg-accent disabled:hover:bg-background disabled:bg-opacity-85 disabled:border-primary flex gap-2 text-text border-2 border-accent p-2 mt-2 bg-background bg-opacity-15 backdrop-blur transition-all duration-200 rounded-lg" onclick={() => {
                                rebuild = Math.random();
                            }}>
                                🔁 Rebuild
                        </button>
                        <button class="hover:bg-accent disabled:hover:bg-background disabled:bg-opacity-85 disabled:border-primary flex gap-2 text-text border-2 border-accent p-2 mt-2 bg-background bg-opacity-15 backdrop-blur transition-all duration-200 rounded-lg" onclick={() => console.log($state.snapshot(build))}>
                            📝 Log build
                        </button>
                    </div>
                </div>
            </div>
            <div class="renderedContent flex items-center flex-col mt-24">
                {#key rebuild}
                    {#each build.components as component}
                        {#if components[component.type]}
                            <!-- svelte-ignore svelte_component_deprecated -->
                            <div class="developmentComponent p-2 border-primary border-2 cursor-pointer rounded-lg">
                                <svelte:component this={components[component.type].component} args={component.props} id={"c_"+components[component.type].idPrefix+"_"+component.id}>
                                    {#if components[component.type].canHaveChildren}
                                        {#each component.children as child}
                                            {#if components[child.type]}
                                                <!-- svelte-ignore svelte_component_deprecated -->
                                                <div class="developmentChildren p-2 border-secondary border-2 rounded-lg">
                                                    <svelte:component this={components[child.type].component} args={child.props} id={"c_"+components[component.type].idPrefix+"_"+child.id} />
                                                </div>
                                            {/if}
                                        {/each}
                                        <div class="newChildren">
                                            {#if addingChild === component.id}
                                                <div class="flex gap-2 flex-col border-2 border-accent p-6 rounded-lg backdrop-blur-sm max-h-64 overflow-y-auto ">
                                                    {#each Object.keys(components) as newcomponent}
                                                        {#if !components[newcomponent].canHaveChildren}
                                                            <button class="hover:bg-accent flex gap-2 text-text border-2 border-accent py-2 px-24 bg-background bg-opacity-15 backdrop-blur transition-all duration-200 rounded-lg" onclick={() => {addChildren(newcomponent, component.id)}}>
                                                                {componentIcons[newcomponent]} {newcomponent[0].toUpperCase() + newcomponent.slice(1)}
                                                            </button>
                                                        {/if}
                                                    {/each}
                                                    <button class="hover:bg-accent flex gap-2 text-text border-2 border-error py-2 px-24 bg-background bg-opacity-15 backdrop-blur transition-all duration-200 rounded-lg" onclick={() => addingChild = false}>
                                                        ❌ Close
                                                    </button>
                                                </div>
                                            {:else}
                                                <button class="hover:bg-accent flex gap-2 text-text border-2 border-accent border-dashed py-2 px-4 bg-background bg-opacity-15 backdrop-blur transition-all duration-200 rounded-lg" onclick={() => addingChild = component.id}>
                                                    <Plus class="text-text" />
                                                    Add children
                                                </button>
                                            {/if}
                                        </div>
                                    {/if}
                                </svelte:component>
                            </div>
                            <br>
                        {/if}
                    {/each}
                {/key}
                <div class="newComponent mb-24">
                    <div class="newComponentScroll" bind:this={newComponentScroll}></div>
                    {#if addingComponent}
                        <div class="flex gap-2 flex-col border-2 border-accent p-6 rounded-lg backdrop-blur-sm max-h-64 overflow-y-auto ">
                            {#each Object.keys(components) as component}
                                <button class="hover:bg-accent flex gap-2 text-text border-2 border-accent py-2 px-24 bg-background bg-opacity-15 backdrop-blur transition-all duration-200 rounded-lg" onclick={() => {addComponent(component)}}>
                                    {componentIcons[component]} {component[0].toUpperCase() + component.slice(1)}
                                </button>
                            {/each}
                            <button class="hover:bg-accent flex gap-2 text-text border-2 border-error py-2 px-24 bg-background bg-opacity-15 backdrop-blur transition-all duration-200 rounded-lg" onclick={() => addingComponent = false}>
                                ❌ Close
                            </button>
                        </div>
                    {:else}
                        <button class="hover:bg-accent flex gap-2 text-text border-2 border-accent py-2 px-24 bg-background bg-opacity-15 backdrop-blur transition-all duration-200 rounded-lg" onclick={() => {addingComponent = true; newComponentScroll.scrollIntoView();}}>
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

{#if editingComponent}
    <div class="componentEditor absolute p-2 rounded-lg min-w-64 border-accent border-2 backdrop-blur-md noEditorExit bg-background bg-opacity-50" bind:this={componentEditor}>
        <div class="flex justify-between items-center">
            <h2 class="selectedComponentType text-xl">
                {selectedComponent.type[0].toUpperCase() + selectedComponent.type.slice(1)}
            </h2>

            <button class="hover:bg-accent flex gap-2 text-text border-2 border-accent hover:border-error p-2 bg-background bg-opacity-15 backdrop-blur transition-all duration-200 rounded-lg" onclick={() => {deleteComponent(selectedComponent.id); rebuild = (Math.random() * 10000) + Math.random(); editingComponent = false;}}>
                <Trash2 class="text-text" />
            </button>            
        </div>
        <div class="selectedComponentEditId my-2 grid gap-2 grid-cols-2 items-center">
            <p class="text-lg">ID:</p>
            <input type="text" class="border-2 rounded-lg border-accent focus:border-secondary outline-none bg-background p-2" autocapitalize="off" placeholder="Component ID" autocomplete="off" bind:value={editorIdEdit} onchange={() => {
                if (!editorIdEdit) {return;}
                selectedComponent.id = editorIdEdit;
            }}>
        </div>
        <hr>
        <div class="selectedComponentEditProps my-2 grid gap-2 grid-cols-2 items-center">
            {#each Object.keys(editorPropsEdit) as prop}
                <p class="text-lg">{prop[0].toUpperCase() + prop.slice(1)}</p>
                {#if typeof components[selectedComponent.type].props[prop] === "string"}
                    <input type="text" class="border-2 rounded-lg border-accent focus:border-secondary outline-none bg-background p-2" autocapitalize="off" placeholder={prop} autocomplete="off" bind:value={editorPropsValues[prop]} onchange={() => {
                        if (!editorPropsEdit[prop] || !editorPropsValues[prop]) {return;}
                        selectedComponent.props[prop] = editorPropsValues[prop];
                        rebuild = (Math.random() * 10000) + Math.random();
                    }}>
                {:else if typeof components[selectedComponent.type].props[prop] === "number"}
                    <input type="number" class="border-2 rounded-lg border-accent focus:border-secondary outline-none bg-background p-2" autocapitalize="off" placeholder={prop} autocomplete="off" bind:value={editorPropsValues[prop]} onchange={() => {
                        if (!editorPropsEdit[prop] || !editorPropsValues[prop]) {return;}
                        selectedComponent.props[prop] = editorPropsValues[prop];
                        rebuild = (Math.random() * 10000) + Math.random();
                    }}> 
                {/if}
            {/each}
        </div>
    </div>
{/if}

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