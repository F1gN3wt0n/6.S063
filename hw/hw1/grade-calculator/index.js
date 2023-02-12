import { createApp } from "https://mavue.mavo.io/mavue.js";

let app = createApp({
	data: {
		participation: {
			studio: null,
			feedback: null,
			other: null
		},
		homeworks: [null]
	},

	computed: {
		/**
		 * Final grade in the class (number)
		 */
		calculatedGrade () {
			return .25 * this.participationGrade + .75 * this.homeworkAverage;
		},

		/**
		 * Returns the average of all homeworks that have been graded (number)
		 */
		homeworkAverage () {
			let done = 0;
			let sum = 0;

			for (let hw of this.homeworks) {
				if (hw === null) continue;
				hw = parseInt(hw);

				// Check that it is a number, and the number is non-negative
				if (hw >= 0) {
					sum += hw;
					done++;
				}
			}

			if (done === 0) {
				return 0;
			} else {
				return sum / done;
			}
		},

		/**
			* Returns the participation grade (number)
			*/
		participationGrade () {
			let p = this.participation;
			return .6 * p.studio + .2 * p.feedback + .2 * p.other;
		},

	},

	methods: {
		/**
		 * Add a new blank homework	to the list.
		 * Does not prevent more homeworks than 12 from being added.
		 */
		addHomework () {
			this.homeworks.push(null);
		}
	}
}, "#grade_calc");
