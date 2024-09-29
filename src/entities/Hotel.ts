import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Room } from "./Room";

@Entity()
export class Hotel extends BaseEntity {
  constructor(init?: Partial<Hotel>) {
    super();
    Object.assign(this, init);
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Room, (room) => room.hotel, { onDelete: "CASCADE" })
  rooms: Room[];

  static async getAll(
    limit: number,
    offset: number
  ): Promise<[Hotel[], number]> {
    return await Hotel.findAndCount({
      take: limit,
      skip: offset,
      relations: ["rooms"],
    });
  }

  static async getById(id: string) {
    return await Hotel.findOne({
      where: { id },
      relations: ["rooms", "rooms.bookings"],
    });
  }

  static add(values: Partial<Hotel>) {
    return new Hotel(values).save();
  }

  static async updateById(id: string, values: Partial<Hotel>) {
    const hotel = await Hotel.createQueryBuilder()
      .update(Hotel)
      .set(values)
      .where("id = :id", { id })
      .execute();
    return hotel;
  }

  static async deleteById(id: string) {
    const hotel = await Hotel.getById(id);

    await Room.createQueryBuilder()
      .update(Room)
      .set({ hotel: null })
      .where("hotelId = :id", { id })
      .execute();
    return await Hotel.delete(id);
  }
}
