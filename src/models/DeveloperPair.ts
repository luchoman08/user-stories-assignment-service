import { Developer } from './Developer';
import { Agent } from '../assignment-service-interface/models/Agent';
export class DeveloperPair {
    id: string;
    nombre?: string;
    developer1?: Developer;
    developer2?: Developer;
    compatibility: number; // from 0 to 100

    public static mockDeveloperID = Agent.default_id;

    public calculate_compatibility() {
        /** 
         * En algunos casos, es posible que sea util tener un par con solo un desarrollador,
         * por ejemplo en el caso que se quiera hacer un emparejamiento pero se de un numero de 
         * desarrolladores impar, se ha decidido dar soporte a esto, por tanto 
         */
        if (!this.developer1 || !this.developer2 ) {
            this.compatibility = 0;
            return ;
        }
        if( this.developer1.id == DeveloperPair.mockDeveloperID || this.developer2.id == DeveloperPair.mockDeveloperID ) {
            this.compatibility = 0;
            return ;
        }
        let compatibility = 0
        let id_skills = this.developer1.punctuations.map( punctuation => punctuation.id);
        let cantidad_skills = this.developer1.punctuations.length;
        let porcentaje_importancia_por_habilidad = 1.0 / (cantidad_skills);
        let compatibility_func = (habilidad1: number, habilidad2: number ) =>  Math.min(habilidad1, habilidad2) * 100 / Math.max(habilidad1,
                                                                                            habilidad2);
        console.log('id_skills: ', id_skills);
        for (let id_habilidad in id_skills){
            
            let develooper1_skill = this.developer1.punctuations
            .find(
                punctuation => punctuation.id == id_habilidad);
            
            let developer2_skill = this.developer2.punctuations
            .find(
                punctuation => punctuation.id == id_habilidad );
                /**
                 * Puede darse el caso que un desarrollador halla sido puntuado en una habilidad en particular, pero
                 * el otro no tenga una puntuación en dicha habilidad, en este caso dicha habilidad no contara para
                 * el calculo de compatibilidad
                 */
            if (!develooper1_skill || !developer2_skill) {
                compatibility += 0;
            } else {
                compatibility += 
                porcentaje_importancia_por_habilidad * compatibility_func(develooper1_skill.value, developer2_skill.value);
            }
            }
        this.compatibility = compatibility;

    }
}