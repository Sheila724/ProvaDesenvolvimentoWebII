const { createApp } = Vue

createApp({
    data() {
        return {
            characters: [],
            loading: false,
            searchText: '',
            nextPage: 1
        }
    },
    computed: {
        filteredCharacters() {
            if (this.searchText) {
                return this.characters.filter(character =>
                    character.name.toLowerCase().includes(this.searchText.toLowerCase())
                )
            }
            return this.characters;
        }
    },
    methods: {
        async fetchCharacters() {
            this.loading = true;
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${this.nextPage}`);
                const data = await response.json();
                const characterDetails = data.results.map(character => ({
                    id: character.id,
                    name: character.name,
                    image: character.image,
                    status: character.status,
                    species: character.species,
                    gender: character.gender,
                    showDetails: true
                }));
                this.characters = [...this.characters, ...characterDetails];
                this.nextPage++;
                this.loading = false;
            } catch (err) {
                console.error(err);
                this.loading = false;
            }
        },
        getStatusClass(status) {
            const statusClassMap = {
                Alive: "alive",
                Dead: "dead",
                unknown: "unknown"
            };
            return statusClassMap[status] || "";
        }
    }
}).mount("#app")
