<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-data-table
            dense
            :headers="headers"
            :items="ranks"
            :loading="loading"
            loading-text="Calculating scores from live ratings..."
            hide-default-footer
            disable-pagination
        >
          <template v-slot:item.flag="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <div v-on="on" class="d-inline-block">
                  <country-flag :country="item.flag.split(' ')[1] === 'en' ? 'gb-eng' : item.flag.split(' ')[1]"></country-flag>
                </div>
              </template>
              <span>{{ item.country }}</span>
            </v-tooltip>
          </template>
          <template v-slot:item.universal_score="{ item }">
            <span class="font-weight-black">{{ item.universal_score.toFixed(2) }}</span>
          </template>
          <template v-slot:item.sum_of_ranks="{ item }">
            <span class="font-weight-black">{{ item.sum_of_ranks }}</span>
          </template>
          <template v-slot:item.standard_score="{ item }">
            <span :class="{ 'primary--text': item.standard_score === 100 }">{{ item.standard_score.toFixed(2) }}</span>
          </template>
          <template v-slot:item.rapid_score="{ item }">
            <span :class="{ 'primary--text': item.rapid_score === 100 }">{{ item.rapid_score.toFixed(2) }}</span>
          </template>
          <template v-slot:item.blitz_score="{ item }">
            <span :class="{ 'primary--text': item.blitz_score === 100 }">{{ item.blitz_score.toFixed(2) }}</span>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import RanksService from '../RanksService'
  import CountryFlag from 'vue-country-flag'

  export default {
    name: 'UniversalRanks',
    props: ['mode'],
    components: {
      CountryFlag
    },
    data: () => ({
      loading: false,
      ranks: [],
      headers: [
        { text: 'Rank', sortable: false, value: 'universal_position' },
        { text: 'Country', sortable: false, value: 'flag' },
        { text: 'Name', sortable: false, value: 'name' },
        { text: 'Score', sortable: false, value: 'universal_score' },
        { text: 'Classic', sortable: false, value: 'standard_score' },
        { text: 'Rapid', sortable: false, value: 'rapid_score' },
        { text: 'Blitz', sortable: false, value: 'blitz_score' }
      ]
    }),
    watch: {
      mode(value) {
        if (value === 0) {
          this.ranks.sort((a, b) => a.universal_position - b.universal_position)
          this.headers = [
            { text: 'Rank', sortable: false, value: 'universal_position' },
            { text: 'Country', sortable: false, value: 'flag' },
            { text: 'Name', sortable: false, value: 'name' },
            { text: 'Score', sortable: false, value: 'universal_score' },
            { text: 'Classic', sortable: false, value: 'standard_score' },
            { text: 'Rapid', sortable: false, value: 'rapid_score' },
            { text: 'Blitz', sortable: false, value: 'blitz_score' }
          ]
        } else {
          this.ranks.sort((a, b) => a.sum_of_ranks_position - b.sum_of_ranks_position)
          this.headers = [
            { text: 'Rank', sortable: false, value: 'sum_of_ranks_position' },
            { text: 'Country', sortable: false, value: 'flag' },
            { text: 'Name', sortable: false, value: 'name' },
            { text: 'Sum', sortable: false, value: 'sum_of_ranks' },
            { text: 'Classic', sortable: false, value: 'standard_position' },
            { text: 'Rapid', sortable: false, value: 'rapid_position' },
            { text: 'Blitz', sortable: false, value: 'blitz_position' }
          ]
        }
      }
    },
    async created() {
      this.loading = true
      this.ranks = await RanksService.getRanks()
      this.loading = false
    }
  }
</script>
