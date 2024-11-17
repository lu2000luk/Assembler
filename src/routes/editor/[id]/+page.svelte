<script>
    let { data } = $props();
    let { id } = data;

    import { doc, setDoc, getDoc } from "firebase/firestore"; 
    import { auth, firestore } from '$lib/firebase';
    import { browser } from '$app/environment';

    import Text from '$lib/components/text.svelte';
    import Group from "$lib/components/group.svelte";
    const components = {
        "text": {
            component: Text,
            props: {
                text: "Hello, world!",
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
        }
    }

    let build = $state({});

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
</script>

{#await getBuild()}
    <div>Loading...</div>
{:then}
    <div class="editorWrapper flex justify-center items-center w-full h-full border-2 border-accent">
        <div class="editorWindow w-full h-full overflow-y-auto">
            <p class="p-8">
                {JSON.stringify(build)}
            </p>
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