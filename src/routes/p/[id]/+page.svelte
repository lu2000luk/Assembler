<script>
// @ts-nocheck

    let { data } = $props();
    let { id } = data;

    import { doc, setDoc, getDoc, FieldValue } from "firebase/firestore"; 
    import { auth, firestore } from '$lib/firebase';
    import { browser } from '$app/environment';
    import { SignedOut } from 'sveltefire';
    import { onMount } from 'svelte';
    
    import { eventCodePrefix, components } from '$lib/components';

    let build = $state({});

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

    function canComponentHaveEvent(eventType, componentType) {
        return components[componentType].availableEvents.includes(eventType);
    }

    onMount(async () => {
        await getBuild();

        build.components.forEach(component => {
            Object.keys(component.events).forEach(key => {
                    if (canComponentHaveEvent(key, component.type)) {
                        let element = document.getElementById("c"+"_"+component.id);
                        if (!element) return;
                        element.addEventListener(key, () => {eval(eventCodePrefix + component.events[key])});
                    }
                });

            if (component.children) {
                component.children.forEach(child => {
                    Object.keys(child.events).forEach(key => {
                        if (canComponentHaveEvent(key, child.type)) {
                            let element = document.getElementById("c"+"_"+child.id);
                            if (!element) return;
                            element.addEventListener(key, () => {eval(eventCodePrefix + child.events[key])});
                        }
                    });
                });
            }
        });
    });
</script>

<SignedOut>
    <div class="navbar flex justify-between m-4 items-center select-none">
        <div class="name">
            <a class="text-2xl hover:tracking-wide cursor-pointer font-bold inline-block bg-clip-text bg-gradient-to-r from-primary to-accent transition-all" style="color: transparent;" href="../../">
                Assembler
            </a>
        </div>
        <button onclick={() => {location.href = "/"}} class="px-5 py-2 border-2 rounded-lg border-accent transition-all duration-200 hover:bg-accent cursor-pointer">Create your own</button>
    </div>
</SignedOut>

{#await getBuild()}
    <p>Loading...</p>
{:then}
    <div class="renderedContent flex items-center flex-col mt-24">
        {#each build.components as component, index}
            {#if components[component.type]}
                    <!-- svelte-ignore svelte_component_deprecated -->
                    <svelte:component this={components[component.type].component} args={component.props} id={"c"+"_"+component.id}>
                        {#if components[component.type].canHaveChildren}
                            {#each component.children as child}
                                {#if components[child.type]}
                                    <svelte:component this={components[child.type].component} args={child.props} id={"c"+"_"+child.id}/>
                                {/if}
                            {/each}
                        {/if}
                    </svelte:component>
                <br>
            {/if}
        {/each}
    </div>
{/await}