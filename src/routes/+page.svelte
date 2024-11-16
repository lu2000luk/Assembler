<script>
    import { userStore } from 'sveltefire';
    import { auth, firestore } from '$lib/firebase';
    import Plus from "lucide-svelte/icons/plus";
    import { doc, setDoc, getDoc } from "firebase/firestore"; 
    import { Doc } from 'sveltefire';

    const user = userStore(auth);

    let newProjectInputMode = $state(false);
    let newProjectName = $state('');

    async function newProject() {
        if (newProjectName.length < 5) {
            alert('Project name must be at least 5 characters long');
            return;
        };

        if (newProjectName.length > 50) {
            alert('Project name must be at most 50 characters long');
            return;
        };

        if (!$user?.uid) {
            alert('You must be logged in to create a project');
            return;
        }

        let docID = newProjectName.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');

        console.log(docID);

        let newDoc = await setDoc(doc(firestore, "projects", docID), {
            name: newProjectName,
            owner: $user?.uid,
            data: "{}"
        });

        let oldUserDoc = await getDoc(doc(firestore, "listing", $user?.uid));

        if (!oldUserDoc.exists()) {
            let userDoc = await setDoc(doc(firestore, "listing", $user?.uid), {
                ownedProjects: [docID]
            });
        } else {
            let userDoc = await setDoc(doc(firestore, "listing", $user?.uid), {
                // @ts-ignore
                ownedProjects: [...oldUserDoc.data()?.ownedProjects, doc(firestore, "projects", docID)]
            }, { merge: true });
        }

        newProjectInputMode = false;
        newProjectName = '';

        console.log('Project created');

        location.href = '/editor/'+docID;
    }
</script>

<div class="m-5 grid grid-cols-4">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="project flex justify-start p-8 m-4 rounded-lg border-2 border-accent transition-all hover:bg-accent duration-200 items-center cursor-pointer"  onclick={() => newProjectInputMode = true}>
        {#if newProjectInputMode}
            <input type="text" class="p-2 border-2 border-secondary bg-background rounded-lg" placeholder="Project name..." bind:value={newProjectName} />
            <button class="p-2 ml-3 border-2 border-secondary rounded-lg transition-all duration-200 hover:bg-secondary" onclick={newProject}>Create</button>
        {:else}
            <Plus />
            <p class="text-xl pl-3">New project</p>
        {/if}
    </div>
    <Doc ref={'listing/'+$user?.uid} let:data>
        {#each data?.ownedProjects as project}
            <Doc ref={project} let:data>
                <div class="project flex justify-start p-8 m-4 rounded-lg border-2 border-accent transition-all hover:bg-accent duration-200 cursor-pointer">
                    <p>{data?.name}</p>
                </div>
            </Doc>
        {/each}
        <span slot="loading">Loading...</span>
    </Doc>
</div>