
export class PulpPairGenerationResponse  {
    /** Example: [
        [
            1,
            4
        ],
        [
            "2",
            3
        ]
    ] */
    pairs: {[id_pair: string]: string[]}; // list of lists of size 2
    /** Id of pair is given by its index in array `this.pairs` */
}