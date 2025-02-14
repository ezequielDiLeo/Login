import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
	selector: 'innovation',
	imports: [CommonModule, NavbarComponent, FooterComponent],
	templateUrl: './innovation.component.html',
	styleUrl: './innovation.component.css'
})
export class InnovationComponent {
	
	innovations = [
		{ 
			name: 'Tecnología de propulsión avanzada', 
			description: 'Motores más eficientes para exploración espacial.',
			image: 'https://i.blogs.es/7fa523/pulsar-fusion/1366_2000.jpeg'
		},
		{ 
			name: 'Nanotecnología', 
			description: 'Materiales más ligeros y resistentes para naves espaciales.',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5rDDwL51CmMa-JF5tyltLijFs__MFHcYVCw&s'
		},
		{ 
			name: 'Exploración de Marte', 
			description: 'Robots y misiones para la colonización del planeta rojo.',
			image: 'https://media.cnn.com/api/v1/images/stellar/prod/cnne-1024388-el-momento-en-que-el-perseverance-toma-su-selfie-en-marte.jpg?c=original'
		},
		{ 
			name: 'GPS de alta presicion', 
			description: 'Aunque el GPS fue desarrollado por el Departamento de Defensa de EE. UU., la NASA ha mejorado su precisión mediante sistemas de corrección y algoritmos avanzados.',
			image: 'https://s1.elespanol.com/2023/02/26/el-cultural/ciencia/entre_2_aguas/744435946_231235243_1024x576.jpg'
		},
		{ 
			name: 'Filtros de Agua Avanzados', 
			description: 'Para garantizar agua potable en la Estación Espacial Internacional (ISS), la NASA creó sistemas de purificación basados en filtros de carbón activado con tecnología de ósmosis inversa.',
			image: 'https://m.media-amazon.com/images/S/aplus-seller-content-images-us-east-1/ATVPDKIKX0DER/AP80RCMNMRJAX/B01J964H7W/IwEB0uoRQzGy._UX685_TTW__.jpg'
		},
		{ 
			name: 'Brazos Robóticos y Prótesis Avanzadas', 
			description: 'El brazo robótico Canadarm, utilizado en los transbordadores espaciales, fue desarrollado por la NASA y la Agencia Espacial Canadiense.  Su tecnología se ha aplicado en prótesis biónicas avanzadas para personas con discapacidad y en cirugías robóticas de precisión.',
			image: 'https://www.cinconoticias.com/wp-content/uploads/Brazos-mecanicos-696x390.jpg'
		},
	];

}
