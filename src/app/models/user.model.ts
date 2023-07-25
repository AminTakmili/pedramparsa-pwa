import { Deserializable } from "./deserializable.model";

export class User implements Deserializable {
	id ! : number;
	fullname ! : string;
	mobile ! : string;
	access_token ! : string;
	// cities : city[];
	deserialize(input: any): this {
		Object.assign(this, input);
		this.access_token = input.token;
		// this.cities = input.cities.map((item: any) => {
		// 	return new cites().deserialize(item);
		// });
		return this;
	}
}
