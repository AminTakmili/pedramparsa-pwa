import { Deserializable } from "./deserializable.model";

export class Idioms implements Deserializable {
	de!: string;
	definitions!: Definitions[];
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}

export class Definitions implements Deserializable {
	de!: string;
	fa!: string;
	guid!: string;
	examples!: Examples[];
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}

export class Examples implements Deserializable {
	de!: string;
	fa!: string;
	guid!: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}