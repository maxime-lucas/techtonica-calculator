import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Item {
  id: string;
  label: string;
  icon_url: string;
}

export interface Category {
  name: string;
  items: Item[];
}

export interface RecipeItem {
  id: string;
  quantity: number;
  rate_per_min: number;
}

export interface Recipe {
  id: string;
  label: string;
  ingredients: RecipeItem[];
  produce: RecipeItem[];
  machine_type: string;
}

export interface Machine {
  id: string;
  label: string;
  icon_url: string;
  machine_type: string;
  multiplier: number;
}

export interface ItemOutput {
  item: Item;
  recipes: Recipe[];
  selected_recipe: Recipe | null;
  quantity: number;
  machines: Machine[];
  selected_machine : Machine | null;
}

export interface ProductionTreeNode {
  node_type: "resource" | "machine";
  icon_url: string;
  resource_label?: string;
  resource_quantity?: string;
  machine_label?: string;
  machine_quantity?: string;
  children: ProductionTreeNode[]
  parent:ProductionTreeNode|null
}

const ITEMS_DATABASE: Category[] = [
  {
    name: "Raw materials",
    items: [
      { id: "kindlevine_stems", label: "Kindlevine Stems", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Kindlevine_Stems.png" },
      { id: "kindlevine_stems_washed", label: "Kindlevine Stems (Washed)", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Kindlevine_Stems_Washed.png" },
      { id: "plantmatter", label: "Plantmatter", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Plantmatter.png" },
      { id: "shiverthorn_buds", label: "Shiverthorn Buds", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Shiverthorn_Buds.png" },
      { id: "shiverthorn_buds_neutralized", label: "Shiverthorn Buds (Neutralized)", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Shiverthorn_Buds_Deactivated.png" },
      { id: "limestone", label: "Limestone", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Limestone.png" },
      { id: "plantmatter_fiber", label: "Plantmatter Fiber", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Plantmatter_Fibers.png" },
      { id: "dirt", label: "Dirt", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Dirt_2.png" },
      { id: "iron_ore", label: "Iron Ore", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Iron_Ore.png" },
      { id: "copper_ore", label: "Copper Ore", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Copper_Ore.png" },
      { id: "atlantum_ore", label: "Atlantum Ore", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Atlantum_Ore.png" },
      { id: "iron_chunk", label: "Iron Chunk", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Iron_Chunk.png" },
      { id: "copper_chunk", label: "Copper Chunk", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Copper_Chunk.png" },
      { id: "atlantum_chunk", label: "Atlantum Chunk", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Atlantum_Ore_Chunk.png" },
    ]
  },
  {
    name: "Threshed Powders",
    items: [
      { id: "kindlevine_extract", label: "Kindlevine Extract", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Kindlevine_Extract.png" },
      { id: "shiverthorn_extract", label: "Shiverthorn Extract", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Shiverthorn_Extract.png" },
      { id: "atlantum_power", label: "Atlantum Powder", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Atlantum_Powder.png" },
      { id: "sand", label: "Sand", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Sand.png" },
      { id: "gravel", label: "Gravel", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Gravel.png" },
      { id: "iron_ore_powder", label: "Iron Ore Powder", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Iron_Ore_Powder.png" },
      { id: "copper_ore_powder", label: "Copper Ore Powder", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Copper_Ore_Powder.png" },
    ]
  },
  {
    name: "Refined Powders",
    items: [
      { id: "carbon_powder", label: "Carbon Powder", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Carbon_Powder.png" },
      { id: "quicklime", label: "Quicklime", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Quicklime.png" },
      { id: "cement", label: "Cement", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Cement.png" },
      { id: "steel_mixture", label: "Steel Mixture", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Steel_Mixture.png" },
      { id: "atlantum_mixture", label: "Atlantum Mixture", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Atlantum_Mixture.png" },
    ]
  },
  {
    name: "Ingots",
    items: [
      { id: "iron_ingot", label: "Iron ingot", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Iron_Ingot.png" },
      { id: "copper_ingot", label: "Copper ingot", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Copper_Ingot.png" },
      { id: "steel_ingot", label: "Steel ingot", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Steel_Ingot.png" },
      { id: "atlantum_ingot", label: "Atlantum ingot", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Atlantum_Ingot.png" },
    ]
  },
  {
    name: "Parts",
    items: [
      { id: "plantmatter_frame", label: "Plantmatter Frame", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Plantmatter_Frame.png" },
      { id: "iron_frame", label: "Iron Frame", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Iron_Frame.png" },
      { id: "iron_components", label: "Iron Components", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Iron_Components.png" },
      { id: "copper_wire", label: "Copper Wire", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Copper_Wire.png" },
      { id: "copper_frame", label: "Copper Frame", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Copper_Frame.png" },
      { id: "copper_components", label: "Copper Components", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Copper_Components.png" },
      { id: "mechanical_components", label: "Mechanical Components", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Mechanical_Components.png" },
      { id: "electrical_components", label: "Electrical Components", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Electric_Components.png" },
    ]
  },
  {
    name: "Plants",
    items: [
      { id: "kindlevine_seed", label: "Kindlevine Seed", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Kindlevine_Seed.png" },
      { id: "kindlevine", label: "Kindlevine", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Kindlevine.png" },
      { id: "shiverthorn_seed", label: "Shiverthorn Seed", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Shiverthorn_Seed.png" },
      { id: "shiverthorn", label: "Shiverthorn", icon_url: "https://www.techtonica-calculator.com/bilder/Items/Shiverthorn.png" },
    ]
  },
]

const RECIPES_DATABASE: Recipe[] = [
  {
    id: "r_iron_ingot",
    label: "Iron Ingot",
    ingredients: [
      { id: "iron_ore", quantity: 2, rate_per_min: 30 }
    ],
    produce: [
      { id: "iron_ingot", quantity: 1, rate_per_min: 15 }
    ],
    machine_type: "smelter"
  },
  {
    id: "r_copper_ingot",
    label: "Copper Ingot",
    ingredients: [
      { id: "copper_ore", quantity: 2, rate_per_min: 30 }
    ],
    produce: [
      { id: "copper_ingot", quantity: 1, rate_per_min: 15 }
    ],
    machine_type: "smelter"
  },
  {
    id: "r_steel_ingot",
    label: "Steel Ingot",
    ingredients: [
      { id: "iron_ingot", quantity: 6, rate_per_min: 6 }
    ],
    produce: [
      { id: "steel_ingot", quantity: 2, rate_per_min: 2 }
    ],
    machine_type: "smelter"
  },
  {
    id: "r_iron_frame",
    label: "Iron Frame",
    ingredients: [
      { id: "iron_ingot", quantity: 6, rate_per_min: 30 }
    ],
    produce: [
      { id: "iron_frame", quantity: 2, rate_per_min: 10 }
    ],
    machine_type: "assembler"
  }
]

const MACHINES_DATABASE: Machine[] = [
  { id: "smelter_mk1", label: "Smelter Mk I", machine_type: "smelter", multiplier: 1, icon_url: "https://www.techtonica-calculator.com/bilder/Machines/Smelter_1.png" },
  { id: "smelter_mk2", label: "Smelter Mk II", machine_type: "smelter", multiplier: 8, icon_url: "https://www.techtonica-calculator.com/bilder/Machines/Smelter_2.png" },
  { id: "assembler_mk1", label: "Assembler Mk I", machine_type: "assembler", multiplier: 1, icon_url: "https://www.techtonica-calculator.com/bilder/Machines/Assembler_1.png" },
  { id: "assembler_mk2", label: "Assembler Mk II", machine_type: "assembler", multiplier: 8, icon_url: "https://www.techtonica-calculator.com/bilder/Machines/Assembler_2.png" }
]

@Injectable({
  providedIn: 'root'
})
export class ProductionPlannerService {

  outputs: ItemOutput[] = [];
  productionTrees: ProductionTreeNode[] = [];

  mapItemsByID: Map<string, Item>;
  mapRecipesByItemID: Map<string, Recipe[]>;
  mapMachinesByID : Map<string, Machine>;
  mapMachinesByType : Map<string, Machine[]>;

  outputsUpdated = new BehaviorSubject(this.outputs);
  productionTreesUpdated = new BehaviorSubject(this.productionTrees);

  constructor() {
    this.mapItemsByID = new Map<string, Item>();
    for (let category of ITEMS_DATABASE) {
      for (let item of category.items) {
        this.mapItemsByID.set(item.id, item);
      }
    }
    console.log(`[ProductionPlannerService][constructor] map of items by ID constructed (${this.mapItemsByID.size} entries)`)

    this.mapRecipesByItemID = new Map<string, Recipe[]>();
    for (let recipe of RECIPES_DATABASE) {
      for (let itemProduce of recipe.produce) {
        if (this.mapRecipesByItemID.has(itemProduce.id)) {
          this.mapRecipesByItemID.get(itemProduce.id)?.push(recipe);
        } else {
          this.mapRecipesByItemID.set(itemProduce.id, [recipe])
        }
      }
    }
    console.log(`[ProductionPlannerService][constructor] map of recipes by item name constructed (${this.mapRecipesByItemID.size} entries)`)

    this.mapMachinesByID = new Map<string,Machine>();
    this.mapMachinesByType = new Map<string,Machine[]>();
    for(let machine of MACHINES_DATABASE){
      this.mapMachinesByID.set(machine.id, machine);

      if(!this.mapMachinesByType.has(machine.machine_type)){
        this.mapMachinesByType.set(machine.machine_type, [machine])
      } else {
        this.mapMachinesByType.get(machine.machine_type)?.push(machine);
      }
    }
    console.log(`[ProductionPlannerService][constructor] map of machines by ID constructed (${this.mapMachinesByID.size} entries)`)
  }

  getItemsByCategory(): Category[] {
    return [...ITEMS_DATABASE];
  }

  addNewOutput(item: Item) {
    let recipes = this.mapRecipesByItemID.get(item.id) || [];
    let machines : Machine[] = [];
    recipes.map(r => r.machine_type).forEach(machine_type => {
      let machinesByType = this.mapMachinesByType.get(machine_type);
      if(machinesByType){
        machines.push(...machinesByType);
      }
    })
    let newOutput: ItemOutput = {
      item,
      quantity: 1,
      recipes,
      selected_recipe: recipes.length > 0 ? recipes[0] : null,
      machines,
      selected_machine : machines.length > 0 ? machines[0] : null
    }
    this.outputs.push(newOutput);
    this.outputsUpdated.next([...this.outputs]);
    this.calculateProduction();
  }

  updateOutputQuantity(item: Item, newQuantity: number) {
    if (newQuantity == 0) {
      this.outputs = this.outputs.filter(o => o.item.id !== item.id);
      this.outputsUpdated.next([...this.outputs]);
    }
    this.calculateProduction();
  }

  updateOutputRecipe(output : ItemOutput, newRecipeID : string){
    this.outputs = this.outputs.map(o => {
      if(o.item.id !== output.item.id ) {
        return {...o}
      } else {
        return {
          ...o,
          selected_recipe: o.recipes.find(r => r.id === newRecipeID) || null
        }
      }
    })
    this.outputsUpdated.next([...this.outputs]);
    this.calculateProduction();
  }

  updateOutputMachine(output : ItemOutput, newMachineID : string){
    this.outputs = this.outputs.map(o => {
      if(o.item.id !== output.item.id ) {
        return {...o}
      } else {
        return {
          ...o,
          selected_machine: o.machines.find(m => m.id === newMachineID) || null
        }
      }
    })
    this.outputsUpdated.next([...this.outputs]);
    this.calculateProduction();
  }


  calculateProduction() {
    let productionTrees: ProductionTreeNode[] = [];
    for (let output of this.outputs) {
      let item_id = output.item.id
      let item_icon_url = output.item.icon_url;
      let item_label = output.item.label;
      let selected_recipe = output.selected_recipe;
      let selected_machine = output.selected_machine;

      if (!selected_recipe) {
        console.log(`[calculateProduction][${item_id}] No recipe available for this item. Continue`);
        continue;
      }

      if (!selected_machine) {
        console.log(`[calculateProduction][${item_id}] No machine available for this item. Continue`);
        continue;
      }

      let quantity = output.quantity;
      let production_specifications = selected_recipe.produce.filter(i => i.id === item_id)[0];
      let rate_per_min = production_specifications.rate_per_min;

      // console.log(`[calculateProduction][${item_id}] quantity=${quantity}`)
      // console.log(`[calculateProduction][${item_id}] production_specifications=${JSON.stringify(production_specifications)}`)
      // console.log(`[calculateProduction][${item_id}] machine=${JSON.stringify(selected_machine)}`)
      let nb_of_machine_required = ( quantity / rate_per_min ) / selected_machine.multiplier;
      // console.log(`[calculateProduction][${item_id}] nb_of_machine_required=${nb_of_machine_required}`)

      let produce_node: ProductionTreeNode = {
        node_type: "resource",
        icon_url: item_icon_url,
        resource_quantity: quantity.toFixed(),
        resource_label: item_label,
        children:[],
        parent:null
      }

      let machine_node: ProductionTreeNode = {
        node_type: "machine",
        icon_url: selected_machine.icon_url,
        machine_label: selected_machine.label,
        machine_quantity: nb_of_machine_required.toFixed(2),
        children:[],
        parent:produce_node
      }

      let ingredient_nodes : ProductionTreeNode[] = [];
      for(let ingredient of selected_recipe.ingredients){
        let ingredient_item = this.mapItemsByID.get(ingredient.id);
        if(!ingredient_item){
          console.log(`[calculateProduction][${item_id}] Ingredient ${ingredient.id} not found in database. Continue`);
          continue;
        }
        let ingredient_node: ProductionTreeNode = {
          node_type: "resource",
          icon_url: ingredient_item.icon_url,
          resource_label: ingredient_item.label,
          resource_quantity: (ingredient.rate_per_min * nb_of_machine_required * selected_machine.multiplier).toFixed(),
          children:[],
          parent: machine_node
        }
        ingredient_nodes.push(ingredient_node);
      }

      machine_node.children = ingredient_nodes;
      produce_node.children = [machine_node]

      productionTrees.push(produce_node);
    }
    this.productionTrees = productionTrees;
    this.productionTreesUpdated.next([...this.productionTrees]);
  }
}
