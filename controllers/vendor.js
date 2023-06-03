const Vendors = require("../models/vendor");

exports.add_vendor = (req, res) => {
    const email = req.body.email;
    Vendors.sync()
        .then(() => {
            Vendors.findAll({ where: { email: email } })
                .then((vendor) => {
                    if (vendor.length >= 1) {
                        return res.status(409).json({
                            message: 'User Already exist'
                        })
                    } else {

                        const params = (req.body)
                        Vendors.create(params)
                            .then((response) => {
                                res.status(201).json({
                                    message: 'Vendors created successfully'
                                })
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    error: err,
                                });
                            })
                    }
                })
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        })

};

exports.all_vendors = (req, res) => {
    Vendors.findAll().then(vendors => {
        return (
            res.status(200).json({
                message: 'All Vendors',
                data: vendors
            })
        );
    });
};

exports.single_vendors = (req, res) => {
    const id = req.params.id;
    Vendors.findOne({ where: { id: id } })
        .then(vendors => {
            return (
                res.status(200).json({
                    message: 'Vendors',
                    data: vendors
                })
            );
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        })
};

exports.update_vendor = (req, res) => {
    const name = req.body.name;
    const params = req.body
    const id = req.params.id;
    Vendors.findAll({ where: { name: name }, })
        .then((vendor) => {

            if (vendor.length <= 1) {
                if (vendor.length == 0) {
                    Vendors.update(params, { where: { id: id } })
                        .then((response) => {
                            res.status(200).json({
                                message: 'Vendor updated successfully'
                            })
                        })
                }
                else {
                    if (vendor.length == 1 && vendor[0].id == id) {
                        Vendors.update(params, { where: { id: id } })
                            .then((response) => {
                                res.status(200).json({
                                    message: 'Vendor updated successfully'
                                })
                            })
                    } else {
                        return res.status(409).json({
                            message: 'Vendor Already exist'
                        })
                    }

                }

            }
            else {
                return res.status(409).json({
                    message: 'Vendor Already exist'
                })
            }
        })
        .catch((err) => {
            console.log('error', err)
            res.status(500).json({
                error: err
            })
        })

    Vendors.findOne({ where: { id: id } })
        .then((vendor) => {
            console.log('data', vendor)
            if (vendor.name === name) {
                return res.status(409).json({
                    message: 'Vendor Already exist'
                })
            } else {
                Vendors.update(params, { where: { id: id } })
                    .then((response) => {
                        res.status(200).json({
                            message: 'Vendor updated successfully'
                        })
                    })
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        })
};


