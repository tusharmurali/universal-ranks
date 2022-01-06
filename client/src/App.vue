<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
            class="shrink mr-2"
            contain
            :src="require('@/assets/logo.png')"
            transition="scale-transition"
            width="40"
        />

        <v-img
          alt="UniversalRanks"
          class="shrink hidden-sm-and-down"
          contain
          min-width="100"
          :src="require('@/assets/name.png')"
          width="200"
        />
      </div>

      <v-spacer></v-spacer>

      <v-dialog max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn fab light x-small class="mr-2" v-on="on">
            <v-icon color="primary">mdi-help</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title><span class="text-h5">What is UniversalRanks?</span></v-card-title>
          <v-card-text>UniversalRanks is a system to rank all-round Chess ability. The score for each time format is calculated by (Player's Rating / Highest Player's Rating) &times; 100. The average across all three time formats is the player's UniversalRanks score.<br><br>UniversalRanks combines the three FIDE lists into one. It weights each time format equally and only depends on the rating of the highest rated player in each time format. Therefore, any improvement in rating (that might not increase a player's rank) will always increase a player's UniversalRanks score. UniversalRanks scores increase more sharply at higher ratings, which makes sense since rating is harder to gain at higher ratings.<br><br>UniversalRanks takes inspiration from KinchRanks, which was used to rank Rubik's Cube speedsolvers. This website uses live ratings from <a target="_blank" href="https://2700chess.com">2700chess.com</a> and thus does not include players inactive in classical chess.<br><br>Check out the&nbsp;<a target="_blank" href="https://github.com/tusharmurali/universal-ranks">GitHub</a>. Website by&nbsp;<a target="_blank" href="https://github.com/tusharmurali">Tushar Muralidharan</a>.</v-card-text>
        </v-card>
      </v-dialog>

      <v-btn-toggle
          class="mr-2"
          v-model="mode"
          mandatory
          color="primary"
          light
      >
        <v-btn>UniversalRanks</v-btn>
        <v-btn>Sum of Ranks</v-btn>
      </v-btn-toggle>
    </v-app-bar>

    <v-main>
      <UniversalRanks :mode="mode"/>
    </v-main>
  </v-app>
</template>

<script>
import UniversalRanks from './components/UniversalRanks';

export default {
  name: 'App',

  components: {
    UniversalRanks,
  },

  data: () => ({
    mode: 0,
  }),
};
</script>
