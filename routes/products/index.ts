import { Router } from "express";
import { productRepository } from "../../repositories";
const productRoutes = Router();
import { Product } from "../products/interface";

//Create a product
productRoutes.post("/", async (req, res) => {
  try {
    const product: Product = {
      brand: req.body.brand,
      color: req.body.color,
      model: req.body.model,
      price: req.body.price,
      image: req.body.image,
    };
    const newDoc = await productRepository.add(product);
    res.status(201).send(`Created a new product: ${newDoc.id}`);
    console.log;
  } catch (error) {
    res
      .status(400)
      .send("Product should contain brand, color, model, price and image");
  }
});

//List all products
productRoutes.get("/list", async (req, res) => {
  try {
    const search: string = req.query.search as any; 
    if (search) {
      const docs = await productRepository.get();
      if (docs) {
        let products: any[] = docs?.docs?.map(item => {
          return {
            id: item.id,
            ...item.data()
          }
        })
        return res.status(200).json(products.filter(item => item.brand === search || item.color === search || item.model === search));
      }
    }
    const docs = await productRepository.get();
    const products = docs.docs.map(item => {
      return {
        id: item.id,
        ...item.data()
      }
    })
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

//List a unique product by ID
productRoutes.get("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("need to pass a valid id")
    }
    const id = req.params.id;
    const product = await productRepository
      .doc(id)
      .get()
      if (product && product.exists) {
        res.status(200).json({ id: product.id, data: product.data() });
      }
  } catch (error) {
    res.status(500).send("Product not found")
  }
 
});

//Update a product
productRoutes.put("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("need to pass a valid id")
    }
    await productRepository
    .doc(req.params.id)
    .set(req.body, { merge: true })
    res.json({ id: req.params.id, message: "Product successfully updated." })
  } catch (error) {
    res.status(500).send(error)
  }
});

//Delete a product
productRoutes.delete("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("need to pass a valid id")
    }
    await productRepository
      .doc(req.params.id)
      .delete()
      res.status(200).send({id: req.params.id, message: "Product successfully deleted!"})
  } catch (error) {
    res.status(500).send("Product cannot deleted");
  }
});

export default productRoutes;
