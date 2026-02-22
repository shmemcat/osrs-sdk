"use strict";

import InventImage from "../../assets/images/equipment/Hunters_sunlight_crossbow.png";
import { Unit } from "../../sdk/Unit";
import { RangedWeapon } from "../../sdk/weapons/RangedWeapon";
import { AttackBonuses } from "../../sdk/gear/Weapon";
import { ItemName } from "../../sdk/ItemName";
import { AttackStyleTypes, AttackStyle } from "../../sdk/AttackStylesController";
import { Assets } from "../../sdk/utils/Assets";

export class HuntersSunlightCrossbow extends RangedWeapon {
  Model = Assets.getAssetUrl("models/player_toxic_blowpipe.glb");
  override get model() {
    return this.Model;
  }

  constructor() {
    super();
    this.bonuses = {
      attack: {
        stab: 0,
        slash: 0,
        crush: 0,
        magic: 0,
        range: 79,
      },
      defence: {
        stab: 0,
        slash: 0,
        crush: 0,
        magic: 0,
        range: 0,
      },
      other: {
        meleeStrength: 0,
        rangedStrength: 0,
        magicDamage: 0,
        prayer: 0,
      },
      targetSpecific: {
        undead: 0,
        slayer: 0,
      },
    };
  }

  compatibleAmmo(): ItemName[] {
    return [ItemName.MOONLIGHT_ANTLER_BOLTS];
  }

  attackStyles() {
    return [AttackStyle.ACCURATE, AttackStyle.RAPID, AttackStyle.LONGRANGE];
  }

  attackStyleCategory(): AttackStyleTypes {
    return AttackStyleTypes.CROSSBOW;
  }

  defaultStyle(): AttackStyle {
    return AttackStyle.RAPID;
  }

  get weight(): number {
    return 6;
  }

  get itemName(): ItemName {
    return ItemName.HUNTERS_SUNLIGHT_CROSSBOW;
  }

  get isTwoHander(): boolean {
    return false;
  }

  get attackRange() {
    if (this.attackStyle() === AttackStyle.LONGRANGE) {
      return 10;
    }
    return 8;
  }

  get attackSpeed() {
    if (this.attackStyle() === AttackStyle.RAPID) {
      return 3;
    }
    return 4;
  }

  get inventoryImage() {
    return InventImage;
  }

  rollDamage(from: Unit, to: Unit, bonuses: AttackBonuses) {
    if (from.equipment.ammo && this.compatibleAmmo().includes(from.equipment.ammo.itemName)) {
      super.rollDamage(from, to, bonuses);
    } else {
      this.damage = -1;
    }
  }
}
